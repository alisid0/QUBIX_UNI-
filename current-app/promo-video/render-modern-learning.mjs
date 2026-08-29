import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
const root=path.resolve('promo-video');
const server=http.createServer(async(req,res)=>{try{const file=path.join(root,decodeURIComponent((req.url||'/').replace(/^\//,''))||'modern-learning-physics.html');if(!path.resolve(file).startsWith(root))throw new Error('Bad path');const data=await fs.readFile(file),ext=path.extname(file);res.writeHead(200,{'Content-Type':ext==='.html'?'text/html':ext==='.webm'?'video/webm':'application/octet-stream'});res.end(data)}catch{res.writeHead(404);res.end()}});await new Promise(r=>server.listen(8021,'127.0.0.1',r));
const browser=await chromium.launch({headless:true,args:['--autoplay-policy=no-user-gesture-required']}),page=await browser.newPage({viewport:{width:960,height:540}});await page.goto('http://127.0.0.1:8021/modern-learning-physics.html');await page.waitForFunction(()=>window.filmReady===true);
console.log('Rendering the modern-learning physics campaign film…');const ready=page.waitForEvent('download',{timeout:180000}),result=await page.evaluate(()=>window.renderFilm()),download=await ready,output=path.resolve('promo-video','qubix-modern-learning-physics-16x9.webm');await download.saveAs(output);await browser.close();await new Promise(r=>server.close(r));console.log(`Saved ${output} (${result.type}, ${result.size} bytes)`);
