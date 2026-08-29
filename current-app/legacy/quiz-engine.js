/* ============================================================
   QUIZ ENGINE — shared by all QUIZ-*.html checkpoints.
   Handles: rendering, randomized-on-retry question values,
   two-attempt-then-remediate flow, scoring.

   Question definitions look like:
     {cg:"CG6", type:"numeric", generate: () => ({q, answer, explain})}
     {cg:"CG1", type:"mcq", generate: () => ({q, opts, answer, explain})}
   `generate()` is called fresh every time the quiz (re)starts, so
   numeric questions can roll new values and MCQ option order can shuffle.
   ============================================================ */

const QuizEngine = (function(){

  function randInt(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function shuffleOptions(opts, answerIndex){
    const order = opts.map((_,i)=>i);
    for(let i=order.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [order[i],order[j]] = [order[j],order[i]];
    }
    const newOpts = order.map(i=>opts[i]);
    const newAnswer = order.indexOf(answerIndex);
    return {opts:newOpts, answer:newAnswer};
  }

  function mount(config){
    const { questionDefs, reviewUrl, mountId, resultId, completeMessage, partialMessage, weakMessage } = config;
    const quizArea = document.getElementById(mountId);
    const resultCard = document.getElementById(resultId);

    let live = [];      // current generated instances, parallel to questionDefs
    let attempts = [];  // attempt count per question
    let status = [];    // 'pending' | 'correct' | 'failed'
    let current = 0;
    let score = 0;

    function freshRun(){
      live = questionDefs.map(def=>{
        const inst = def.generate();
        if(def.type === 'mcq'){
          const shuffled = shuffleOptions(inst.opts, inst.answer);
          inst.opts = shuffled.opts;
          inst.answer = shuffled.answer;
        }
        return Object.assign({cg:def.cg, type:def.type}, inst);
      });
      attempts = questionDefs.map(()=>0);
      status = questionDefs.map(()=>'pending');
      current = 0;
      score = 0;
      resultCard.style.display = 'none';
      quizArea.style.display = 'block';
      render();
    }

    function render(){
      quizArea.innerHTML = '';
      live.forEach((q, i)=>{
        const card = document.createElement('div');
        card.className = 'q-card' + (i === current ? ' active' : '');
        card.id = 'qcard'+i;

        let inner = `<div class="q-tag">${q.cg} · question ${i+1} of ${live.length}</div><div class="q-text">${q.q}</div>`;

        if(q.type === 'mcq'){
          inner += `<div class="opts">` + q.opts.map((opt,oi)=>`<button class="opt" data-i="${oi}" onclick="QuizEngine._select(${i},${oi})">${opt}</button>`).join('') + `</div>`;
        } else {
          inner += `<div class="numwrap"><input type="number" id="numInput${i}" placeholder="Your answer"><button class="checkBtn" onclick="QuizEngine._checkNumeric(${i})">Check</button></div>`;
        }

        inner += `<div class="feedback" id="fb${i}"></div>
          <div class="remediation" id="remed${i}" style="display:none">
            <a class="reviewBtn" id="reviewLink${i}" target="_blank">Review this topic</a>
            <button class="skipBtn" onclick="QuizEngine._skip(${i})">Skip to next</button>
          </div>
          <div class="nav"><button class="nextBtn" id="next${i}" style="display:none" onclick="QuizEngine._goNext(${i})">${i===live.length-1?'See score':'Next'}</button></div>`;

        card.innerHTML = inner;
        quizArea.appendChild(card);
      });
      updateProgress();
    }

    function updateProgress(){
      const done = status.filter(s=>s!=='pending').length;
      document.getElementById('progressBar').style.width = (done/live.length*100)+'%';
    }

    function showFeedback(i, msg, cls){
      const fb = document.getElementById('fb'+i);
      fb.className = 'feedback show ' + cls;
      fb.textContent = msg;
    }

    function lockQuestion(i){
      const card = document.getElementById('qcard'+i);
      card.querySelectorAll('.opt').forEach(b=>{ b.classList.add('locked'); b.onclick=null; });
      const inp = document.getElementById('numInput'+i);
      if(inp) inp.disabled = true;
      const btn = card.querySelector('.checkBtn');
      if(btn) btn.disabled = true;
    }

    function markCorrect(i){
      status[i] = 'correct';
      score++;
      lockQuestion(i);
      document.getElementById('next'+i).style.display = 'inline-block';
    }

    function markFailedAfterTwo(i){
      status[i] = 'failed';
      lockQuestion(i);
      const q = live[i];
      const ans = q.type === 'mcq' ? q.opts[q.answer] : q.answer;
      showFeedback(i, `Correct answer: ${ans}. ${q.explain}`, 'bad');
      const remed = document.getElementById('remed'+i);
      remed.style.display = 'flex';
      document.getElementById('reviewLink'+i).href = reviewUrl + '#' + q.cg.toLowerCase();
    }

    function evaluate(i, isCorrect){
      const q = live[i];
      if(isCorrect){
        showFeedback(i, 'Correct. ' + q.explain, 'good');
        markCorrect(i);
        return;
      }
      attempts[i]++;
      if(attempts[i] >= 2){
        markFailedAfterTwo(i);
      } else {
        showFeedback(i, 'Not quite — try once more.', 'bad');
      }
    }

    function select(i, oi){
      if(status[i] !== 'pending') return;
      const q = live[i];
      const card = document.getElementById('qcard'+i);
      card.querySelectorAll('.opt').forEach(b=>b.classList.remove('selected','correct','incorrect'));
      const isCorrect = oi === q.answer;
      const btn = card.querySelector(`.opt[data-i="${oi}"]`);
      btn.classList.add(isCorrect ? 'correct' : 'incorrect', 'selected');
      evaluate(i, isCorrect);
    }

    function checkNumeric(i){
      if(status[i] !== 'pending') return;
      const inp = document.getElementById('numInput'+i);
      const val = parseFloat(inp.value);
      const q = live[i];
      const isCorrect = !isNaN(val) && Math.abs(val - q.answer) < 1e-6;
      inp.style.borderColor = isCorrect ? '#a9d6a0' : '#e07a5f';
      evaluate(i, isCorrect);
    }

    function skip(i){
      status[i] = 'failed';
      goNext(i);
    }

    function goNext(i){
      document.getElementById('qcard'+i).classList.remove('active');
      updateProgress();
      if(i === live.length-1){ showResult(); return; }
      current = i+1;
      document.getElementById('qcard'+current).classList.add('active');
    }

    function showResult(){
      quizArea.style.display = 'none';
      resultCard.style.display = 'block';
      document.getElementById(resultId+'Score').textContent = score + ' / ' + live.length;
      let msg;
      if(score === live.length) msg = completeMessage;
      else if(score >= live.length*0.7) msg = partialMessage;
      else msg = weakMessage;
      document.getElementById(resultId+'Sub').textContent = msg;
      if(typeof config.onComplete === 'function') config.onComplete(score, live.length);
    }

    document.getElementById(resultId+'Restart').onclick = freshRun;

    QuizEngine._select = select;
    QuizEngine._checkNumeric = checkNumeric;
    QuizEngine._skip = skip;
    QuizEngine._goNext = goNext;

    freshRun();
  }

  return { mount, randInt, pick };
})();
