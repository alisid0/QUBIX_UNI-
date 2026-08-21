import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
const root=path.resolve('promo-video'),review=path.join(root,'review-modern-learning');await fs.mkdir(review,{recursive:true});
const server=http.createServer(async(req,res)=>{try{const data=await fs.readFile(path.join(root,'qubix-modern-learning-physics-16x9.webm'));res.writeHead(200,{'Content-Type':'video/webm'});res.end(data)}catch{res.writeHead(404);res.end()}});await new Promise(r=>server.listen(8022,'127.0.0.1',r));
const browser=await chromium.launch({headless:true}),page=await browser.newPage({viewport:{width:960,height:540}});await page.setContent('<style>html,body{margin:0;background:#000}video{width:960px;height:540px}</style><video autoplay muted src="http://127.0.0.1:8022/video.webm"></video>');
let previous=0;for(const second of [4,8,13,18,24,30,34,38]){await page.waitForTimeout((second-previous)*1000);await page.screenshot({path:path.join(review,`${String(second).padStart(2,'0')}s.png`)});previous=second}
const meta=await page.evaluate(()=>{const v=document.querySelector('video');return{width:v.videoWidth,height:v.videoHeight,currentTime:v.currentTime}});await browser.close();await new Promise(r=>server.close(r));console.log(JSON.stringify(meta));
