import { chromium } from 'playwright';
import fs from 'node:fs';
import http from 'node:http';
const file='promo-video/qubix-modern-learning-social-5mb.mp4';
const server=http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'video/mp4'});fs.createReadStream(file).pipe(res)});await new Promise(r=>server.listen(8025,'127.0.0.1',r));
const browser=await chromium.launch({headless:true}),page=await browser.newPage({viewport:{width:1280,height:720}});await page.setContent('<video muted src="http://127.0.0.1:8025/video.mp4"></video>');await page.waitForFunction(()=>document.querySelector('video').readyState>=1);
const meta=await page.evaluate(()=>{const v=document.querySelector('video');return{width:v.videoWidth,height:v.videoHeight,duration:v.duration,seekable:v.seekable.length}});await page.evaluate(()=>document.querySelector('video').play());await page.waitForTimeout(12000);await page.screenshot({path:'promo-video/social-mp4-review.png'});meta.currentTime=await page.evaluate(()=>document.querySelector('video').currentTime);await browser.close();await new Promise(r=>server.close(r));console.log(JSON.stringify(meta));
