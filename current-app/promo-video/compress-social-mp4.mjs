import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';

const root=path.resolve('promo-video');
const source='qubix-modern-learning-physics-16x9.webm';
const output=path.join(root,'qubix-modern-learning-social-5mb.mp4');
const server=http.createServer(async(req,res)=>{try{const file=path.join(root,decodeURIComponent((req.url||'/').replace(/^\//,''))||source);const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':file.endsWith('.webm')?'video/webm':'text/html'});res.end(data)}catch{res.writeHead(404);res.end()}});
await new Promise(r=>server.listen(8024,'127.0.0.1',r));
const browser=await chromium.launch({headless:true,args:['--autoplay-policy=no-user-gesture-required']}),page=await browser.newPage({viewport:{width:1280,height:720},acceptDownloads:true});
await page.setContent(`<video id="src" muted playsinline preload="auto" src="http://127.0.0.1:8024/${source}"></video><canvas id="out" width="1280" height="720"></canvas>`);
await page.waitForFunction(()=>document.querySelector('#src').readyState>=3);
const ready=page.waitForEvent('download',{timeout:120000});
const result=await page.evaluate(async()=>{
  const video=document.querySelector('#src'),canvas=document.querySelector('#out'),ctx=canvas.getContext('2d'),fps=24;
  const ac=new AudioContext({sampleRate:44100}),dest=ac.createMediaStreamDestination(),source=ac.createMediaElementSource(video);source.connect(dest);
  const stream=new MediaStream([...canvas.captureStream(fps).getVideoTracks(),...dest.stream.getAudioTracks()]);
  const mime='video/mp4;codecs=avc1.42E01E,mp4a.40.2';
  const rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:860000,audioBitsPerSecond:48000}),chunks=[];
  rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};const stopped=new Promise(r=>rec.onstop=r);rec.start(1000);await video.play();
  await new Promise(resolve=>{function frame(){ctx.drawImage(video,0,0,1280,720);if(!video.ended)requestAnimationFrame(frame);else resolve()}requestAnimationFrame(frame)});
  rec.stop();await stopped;await ac.close();const blob=new Blob(chunks,{type:mime}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='qubix-modern-learning-social-5mb.mp4';document.body.append(link);link.click();link.remove();return{size:blob.size,type:mime};
});
const download=await ready;await download.saveAs(output);await browser.close();await new Promise(r=>server.close(r));console.log(JSON.stringify({...result,output}));
