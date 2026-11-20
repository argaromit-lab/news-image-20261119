import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';

const root=path.dirname(fileURLToPath(import.meta.url));
const image=await fs.readFile(path.join(root,'entry.png'));
const signature=Buffer.from([137,80,78,71,13,10,26,10]);
if(!image.subarray(0,8).equals(signature))throw new Error('Not a PNG');
if(image.length>=900000)throw new Error('Image must be below 900 KB');
const crc32=bytes=>{
  let c=0xffffffff;
  for(const byte of bytes){c^=byte;for(let bit=0;bit<8;bit++)c=(c>>>1)^((c&1)?0xedb88320:0);}
  return (c^0xffffffff)>>>0;
};
const chunks=[];let pos=8,ended=false,header;
while(pos<image.length){
  const length=image.readUInt32BE(pos),type=image.toString('ascii',pos+4,pos+8),end=pos+12+length;
  if(end>image.length)throw new Error('Truncated PNG');
  if(crc32(image.subarray(pos+4,pos+8+length))!==image.readUInt32BE(pos+8+length))throw new Error('PNG checksum mismatch');
  if(type==='IHDR')header=image.subarray(pos+8,pos+8+length);
  if(type==='IDAT')chunks.push(image.subarray(pos+8,pos+8+length));
  pos=end;if(type==='IEND'){ended=true;break;}
}
if(!ended||pos!==image.length||!header||header.readUInt32BE(0)!==1024||header.readUInt32BE(4)!==762)throw new Error('Incomplete or incorrectly sized landscape image');
const width=header.readUInt32BE(0),height=header.readUInt32BE(4);
const decoded=inflateSync(Buffer.concat(chunks));
const channels={0:1,2:3,4:2,6:4}[header[9]];
if(header[8]!==8||!channels||decoded.length!==(width*channels+1)*height)throw new Error('Unexpected PNG scanline data');
const runs=[];
for(let i=1;i<=2;i++){
  const dir=path.join(root,'.makefun-kit',`run-${i}`);
  await fs.mkdir(dir,{recursive:true});
  const run=spawnSync(process.execPath,[path.join(root,'main.ts')],{cwd:root,env:{...process.env,MAKEFUN_OUTPUT_DIR:dir},encoding:'utf8',timeout:10000});
  if(run.status!==0)throw new Error(`Runtime failed: ${run.stderr}`);
  const bytes=await fs.readFile(path.join(dir,'entry.png'));
  if(!bytes.equals(image))throw new Error('Runtime output differs');
  runs.push(createHash('sha256').update(bytes).digest('hex'));
}
const result={valid:true,width,height,bytes:image.length,completePNG:true,crcChecks:true,deterministic:runs[0]===runs[1],sha256:runs[0],runs:2};
await fs.writeFile(path.join(root,'.makefun-kit','runtime-audit.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
