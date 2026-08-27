// Volume 0, chapter 08. Chance and inference.
//
// Chapter 4 stops at describing a set of values you have. This chapter is about
// the step everybody takes next without noticing: saying something about values
// you do not have. Every figure in the Superstore is a sample of something,
// including the ones that look like a census, and the difference between "this
// is what happened" and "this is what happens" is where most reporting goes
// wrong.
//
// It follows Data Science from Scratch chapters 6 and 7 in topic order:
// probability, dependence and conditional probability, then sampling
// distributions, confidence intervals and hypothesis tests. The examples,
// figures and prose are Qubix's own and are set in the Superstore, because a
// probability lesson written about coins teaches coins.
//
// Deliberately arithmetic-first. Nothing here needs calculus, and the two
// mistakes it is trying to prevent, forgetting the base rate and reading a
// p-value as the probability of being wrong, are both mistakes of
// interpretation rather than of algebra.

export const SHARED_FOUNDATIONS_PART_EIGHT = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-EIGHT',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'Chance and Inference',
  subtitle: 'Part Eight of Volume 0',
  totalMinutes: 50,
  sessions: Object.freeze([

    /* ── 01 ────────────────────────────────────────────────────────────── */
    Object.freeze({
      id: 'probability-as-proportion', number: '01',
      title: 'A probability is a proportion of something named',
      studyMinutes: 7, playMinutes: 6,
      objective: 'State a probability as a count over a named denominator, and say what changes when the denominator changes.',
      audioSummary: 'A probability is a share of a set. Before quoting one, say which set. The chance that a sale was paid in cash is the number of cash sales divided by the number of sales you counted, and that denominator is a decision rather than a fact: all sales, one branch, one week, one kind of till. Two people quoting different probabilities for the same event are usually dividing by different things. Independence means knowing one outcome tells you nothing about the other, and it is rarer than it looks: knowing a sale went through self-service tells you it was not paid in cash, because those machines take no notes.',
      opening: 'The chance a sale is paid in cash sounds like a property of shoppers. It is a property of the set of sales you chose to count.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Count over a denominator you can name', paragraphs: Object.freeze([
          'A probability is the size of the group you care about divided by the size of the group you drew from. Of 15,315 sales in the window, 2,968 were paid in cash, and 2,968 divided by 15,315 is 0.19: the probability that a sale picked at random from this window was a cash sale.',
          'The denominator is a choice and it belongs in the sentence. "About a fifth of sales are cash" is not a fact until it says a fifth of which sales: every branch or one, every till or the staffed ones, this quarter or last. Chapter 2 asked for the denominator under a rate. A probability is a rate whose denominator is easier to leave out, because the word "probability" sounds like it belongs to the event rather than to the counting.'
        ]) }),
        Object.freeze({ heading: 'The same event, several honest probabilities', paragraphs: Object.freeze([
          'Restricting the set changes the number, and none of the resulting numbers is wrong. Among sales put through a staffed till the figure is 0.25. Among sales put through self-service it is zero, because those machines do not take notes. Both are true, and neither is the chain figure of 0.19.',
          'This is why a probability quoted without its population is close to useless in an argument. Two colleagues can both be right and still disagree, exactly as they did over sales by region, and for the same reason: the number was computed over a set nobody named out loud.'
        ]) }),
        Object.freeze({ heading: 'Independence is rarer than it looks', paragraphs: Object.freeze([
          'Two events are independent when knowing one happened tells you nothing about the other. Multiplying probabilities together is only allowed under that assumption, and in a shop it often fails. Paying in cash and using self-service are not independent at all: knowing a sale went through self-service tells you with certainty that it was not cash, because those machines take no notes.',
          'Assuming independence when it does not hold produces numbers that are too confident rather than obviously wrong, which is what makes it dangerous. If you multiply two probabilities, say why the two things do not inform each other, and be suspicious when the reason is that it was convenient. The strongest dependence is often structural, built into how the shop works rather than into how people behave.'
        ]) })
      ]),
      example: Object.freeze({
        title: 'One event, four denominators',
        headers: Object.freeze(['Set counted', 'Cash sales', 'Sales counted', 'Probability']),
        rows: Object.freeze([
          Object.freeze(['Every sale in the window', '2,968', '15,315', '0.19']),
          Object.freeze(['Staffed tills only', '2,599', '10,462', '0.25']),
          Object.freeze(['Kiosk tills only', '369', '1,577', '0.23']),
          Object.freeze(['Self-service tills only', '0', '3,276', '0.00'])
        ])
      }),
      workbook: Object.freeze({
        title: 'Ten-minute denominator audit',
        prompt: 'Take any probability or percentage you have written down recently, at work or from a news story.',
        steps: Object.freeze([
          'Write the numerator: what was counted.',
          'Write the denominator: what it was counted out of.',
          'Name one narrower set the same event could have been counted over.',
          'Estimate whether the probability would rise or fall over that narrower set, and say why.',
          'Rewrite the original sentence so the denominator is impossible to miss.'
        ])
      }),
      check: Object.freeze({
        prompt: 'A colleague reports "the probability a sale is paid in cash is 0.25". What is missing before that can be compared with anything?',
        answer: 'population',
        options: Object.freeze([
          Object.freeze(['precision', 'More decimal places, so small differences are visible']),
          Object.freeze(['population', 'The set it was counted over, since 0.25 is the staffed-till figure and the chain is 0.19']),
          Object.freeze(['method', 'Whether it was calculated in SQL or in a spreadsheet'])
        ]),
        explanation: 'A probability is a share of a named set, and without the set two honest figures can disagree while both remain correct.'
      }),
      practice: Object.freeze({
        title: 'The Rate Desk',
        href: '?mode=game&mission=rate-desk',
        instruction: 'Name the denominator under each figure before you compare any two of them.'
      }),
      sources: Object.freeze([
        Object.freeze({ label: 'OpenStax — Introduction to Probability', url: 'https://openstax.org/books/introductory-statistics-2e/pages/3-introduction', licence: 'CC BY 4.0' }),
        Object.freeze({ label: 'NIST/SEMATECH — What is probability?', url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda36.htm', licence: 'Permissive (US Government work)' })
      ])
    }),

    /* ── 02 ────────────────────────────────────────────────────────────── */
    Object.freeze({
      id: 'conditional-and-base-rate', number: '02',
      title: 'What you already know changes the number',
      studyMinutes: 7, playMinutes: 6,
      objective: 'Compute a conditional probability, and explain why a reliable alarm can still be wrong most of the times it sounds.',
      audioSummary: 'Conditional probability is the probability of one thing given that another is already known. It is the same count over a smaller denominator: instead of dividing by everything, divide by the rows where the condition holds. The result is usually different from the unconditional figure, and treating them as interchangeable is one of the most expensive mistakes available. The base rate is the reason. When the thing being detected is rare, even an accurate test produces more false alarms than true ones, because it is applied so many more times to cases where nothing is wrong.',
      opening: 'A cold-chain alarm is right ninety-five times in a hundred. It sounds. The chance the freezer is actually failing is nowhere near ninety-five per cent.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Conditioning is dividing by less', paragraphs: Object.freeze([
          'The probability of A given B is the number of rows where both hold, divided by the number of rows where B holds. Nothing new is happening: it is still a count over a denominator, and the condition has simply shrunk the denominator.',
          'Reading it aloud in that form prevents most errors. "Of the sales that used a loyalty card, what share were over twenty pounds" is a different question from "of the sales over twenty pounds, what share used a loyalty card", and the two answers are usually not close. Both are conditional probabilities and they condition on opposite things.'
        ]) }),
        Object.freeze({ heading: 'The base rate decides what an alarm means', paragraphs: Object.freeze([
          'Suppose a freezer genuinely fails on one day in two hundred, and the sensor alarm catches a real failure ninety-five times out of a hundred while raising a false alarm on five per cent of normal days. Across two hundred freezer-days there is roughly one real failure, which the alarm almost certainly catches, and about ten false alarms from the hundred and ninety-nine normal days.',
          'So of eleven alarms, ten are false. The alarm is accurate and still wrong most of the times it sounds, because it is applied overwhelmingly often to freezers that are fine. Nothing about the sensor is broken. What is missing is the base rate, and it is missing because it is not printed on the alarm.'
        ]) }),
        Object.freeze({ heading: 'Where this shows up in ordinary work', paragraphs: Object.freeze([
          'Any rule that flags a small group out of a large one has this shape: fraud checks, duplicate detection, stock-count exception reports, and every model that predicts something rare. A flag with high accuracy against a rare event will still send people to investigate mostly nothing.',
          'The practical response is not to distrust the alarm. It is to quote precision alongside accuracy: of the cases it flags, what share turn out to be real. That number falls out of the same two by two table, and it is the one an operations manager actually needs.'
        ]) })
      ]),
      // The two-by-two below is where the intuition fails, so the figure draws
      // the population instead and lets a reader count the false alarms.
      figure: Object.freeze({ kind: 'base-rate', days: 200, failureIn: 200,
        catchRate: 0.95, falseRate: 0.05,
        caption: 'Two hundred freezer-days, and the eleven that alarmed',
        note: 'The grid is computed from the same rates the table below is, so the two cannot disagree.' }),
      example: Object.freeze({
        title: 'Two hundred freezer-days, one real failure',
        headers: Object.freeze(['', 'Freezer failing', 'Freezer fine', 'Total']),
        rows: Object.freeze([
          Object.freeze(['Alarm sounds', '1', '10', '11']),
          Object.freeze(['Alarm silent', '0', '189', '189']),
          Object.freeze(['Total', '1', '199', '200']),
          Object.freeze(['Of alarms, real', '1 ÷ 11 = 9%', '', ''])
        ])
      }),
      workbook: Object.freeze({
        title: 'Fifteen-minute two by two',
        prompt: 'Pick any alert, flag or exception report you have seen, at work or in the news.',
        steps: Object.freeze([
          'Estimate how often the thing it detects actually happens. This is the base rate.',
          'Estimate how often it fires when the thing is happening, and when it is not.',
          'Fill a two by two table for a hundred or a thousand cases.',
          'Divide true alarms by all alarms to get precision.',
          'Write one sentence a manager could act on, using precision rather than accuracy.'
        ])
      }),
      check: Object.freeze({
        prompt: 'The alarm is 95% accurate and only 9% of alarms are real failures. What explains the gap?',
        answer: 'base-rate',
        options: Object.freeze([
          Object.freeze(['broken', 'The sensor is faulty and should be recalibrated']),
          Object.freeze(['base-rate', 'Real failures are rare, so the few per cent of false alarms are drawn from a far larger pool']),
          Object.freeze(['sample', 'Two hundred freezer-days is too small a sample to judge'])
        ]),
        explanation: 'A small error rate applied to a large healthy population produces more false alarms than a high catch rate applied to a rare real one.'
      }),
      practice: Object.freeze({
        title: 'The Sampling Desk',
        href: '?mode=game&mission=sampling-desk',
        instruction: 'Work out who is inside the group a figure was computed over, and who was never eligible to appear in it.'
      }),
      sources: Object.freeze([
        Object.freeze({ label: 'OpenStax — Two Basic Rules of Probability', url: 'https://openstax.org/books/introductory-statistics-2e/pages/3-3-two-basic-rules-of-probability', licence: 'CC BY 4.0' }),
        Object.freeze({ label: 'NIST/SEMATECH — Conditional probability', url: 'https://www.itl.nist.gov/div898/handbook/prc/section1/prc12.htm', licence: 'Permissive (US Government work)' })
      ])
    }),

    /* ── 03 ────────────────────────────────────────────────────────────── */
    Object.freeze({
      id: 'sample-to-claim', number: '03',
      title: 'What a sample can and cannot say',
      studyMinutes: 7, playMinutes: 6,
      objective: 'Explain why an estimate from a sample moves, and read a confidence interval as a statement about the method rather than about one number.',
      audioSummary: 'An estimate computed from a sample would have come out differently had a different sample been drawn. That variation is not error in the sense of a mistake, it is the ordinary consequence of not measuring everything, and it can be quantified. Larger samples vary less, and they do so slowly: quartering the variation costs four times the data. A confidence interval expresses that variation as a range, and it describes the procedure rather than the particular interval in front of you. The competitor price checks are the clearest case in the Superstore, because two thirds of branch-weeks were never visited at all.',
      opening: 'Somebody walks a competitor with a clipboard once a week. Everything the chain believes about rival pricing rests on where they happened to walk.',
      sections: Object.freeze([
        Object.freeze({ heading: 'An estimate is one draw from many possible ones', paragraphs: Object.freeze([
          'The mean price a competitor charges, computed from the lines a checker recorded this week, is an estimate. Send a different checker to a different store on a different day and the number moves. The quantity being estimated did not move; the sample did.',
          'This is why a single figure without any sense of its stability invites false precision. Reporting a competitor index to two decimal places from forty observations claims a steadiness the data cannot support, and nothing about the number itself gives that away.'
        ]) }),
        Object.freeze({ heading: 'More data helps, and helps slowly', paragraphs: Object.freeze([
          'The spread of an estimate shrinks with the square root of the sample size. Going from a hundred observations to four hundred halves it. Going from a hundred to two hundred improves it by about thirty per cent, which is usually less than people expect when they ask for "a bit more data".',
          'The practical consequence is that the first observations are worth far more than the last ones, and that a thin sample cannot be rescued by careful analysis. The elasticity estimates in the pricing tables show this directly: some are fitted on thousands of observations and some on fewer than fifty, and they are published in the same table with the same number of decimal places.'
        ]) }),
        Object.freeze({ heading: 'What a confidence interval actually claims', paragraphs: Object.freeze([
          'A ninety-five per cent confidence interval is built by a procedure that, repeated on many samples, produces intervals containing the true value about ninety-five per cent of the time. The claim is about the method across repetitions, not about the single interval you are looking at.',
          'This distinction matters when a decision hangs on it. The interval you have either contains the truth or does not, and you cannot know which. What you can say is that the recipe is reliable at a stated rate, which is enough to act on and is not the same as a ninety-five per cent chance that this particular range is right.'
        ]) })
      ]),
      // Chapter 8's first figure, and the one place in the volume where motion
      // is doing something a still picture cannot: an estimate moving because
      // a different sample was drawn.
      figure: Object.freeze({ kind: 'sampling-spread', case: 'baskets',
        caption: 'Twenty-four samples from the same forty baskets',
        note: 'Every dot is a mean the shop could honestly have reported that week.' }),
      example: Object.freeze({
        title: 'The same estimate from four sample sizes',
        headers: Object.freeze(['Observations', 'Estimated mean', 'Rough interval', 'Width']),
        rows: Object.freeze([
          Object.freeze(['9', '£2.94', '£2.31 to £3.57', '£1.26']),
          Object.freeze(['50', '£2.91', '£2.64 to £3.18', '£0.54']),
          Object.freeze(['400', '£2.92', '£2.83 to £3.01', '£0.18']),
          Object.freeze(['1,600', '£2.91', '£2.86 to £2.96', '£0.10'])
        ])
      }),
      workbook: Object.freeze({
        title: 'Fifteen-minute resampling by hand',
        prompt: 'Take twenty numbers you have, such as twenty prices, times or counts.',
        steps: Object.freeze([
          'Compute the mean of all twenty and write it down.',
          'Cover half at random and compute the mean of the remaining ten.',
          'Repeat with three more different halves.',
          'Write down the spread between the smallest and largest of those four means.',
          'Decide whether you would report the original mean to the nearest penny, and say why.'
        ])
      }),
      check: Object.freeze({
        prompt: 'An elasticity is estimated at −1.42 from nine observations. What is the honest way to use it?',
        answer: 'too-thin',
        options: Object.freeze([
          Object.freeze(['use-it', 'Use it. It is the only estimate available for that product']),
          Object.freeze(['too-thin', 'Treat it as unusable for a pricing decision and say why, because nine observations cannot pin down a slope']),
          Object.freeze(['round-it', 'Round it to −1.4 so it looks less precise than it is'])
        ]),
        explanation: 'Rounding hides the problem without fixing it, and an estimate whose interval spans most of the plausible range cannot separate one decision from another.'
      }),
      practice: Object.freeze({
        title: 'The Distribution Desk',
        href: '?mode=game&mission=distribution-desk',
        instruction: 'Watch how much a summary moves as the data behind it changes, before trusting any single value of it.'
      }),
      sources: Object.freeze([
        Object.freeze({ label: 'OpenStax — Confidence Intervals', url: 'https://openstax.org/books/introductory-statistics-2e/pages/8-introduction', licence: 'CC BY 4.0' }),
        Object.freeze({ label: 'ONS — Uncertainty and sampling variability', url: 'https://www.ons.gov.uk/methodology/methodologytopicsandstatisticalconcepts/uncertaintyandhowwemeasureit', licence: 'Open Government Licence v3.0' })
      ])
    }),

    /* ── 04 ────────────────────────────────────────────────────────────── */
    Object.freeze({
      id: 'testing-a-difference', number: '04',
      title: 'Different, or different this week?',
      // Five rather than seven because this session carries the chapter's
      // applied exercise, and the declared time has to be what a learner
      // actually spends rather than reading time plus a wish.
      studyMinutes: 5, playMinutes: 6,
      objective: 'Frame a comparison as a testable claim, and state what a p-value does and does not tell you.',
      audioSummary: 'Two numbers computed from samples will almost never be identical, so the question is never whether they differ. It is whether they differ by more than the wobble you would expect from sampling alone. A test makes that concrete: assume there is no real difference, work out how often data as extreme as yours would appear anyway, and treat a small answer as evidence against the assumption. A p-value is not the probability that the claim is false, nor the probability of a fluke, and it says nothing about whether the difference is large enough to act on. Significance and importance are separate questions.',
      opening: 'Self-service takes 5.2 seconds a scan and staffed takes 2.8. The difference is obvious. Northgate is up two per cent on last week, and that one is not.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Start from the boring explanation', paragraphs: Object.freeze([
          'A test begins by assuming nothing interesting is happening: the two groups are the same, and any gap you see is the ordinary variation of sampling. That assumption is deliberately the dull one, because it is the one you want to make hard to keep.',
          'Then you ask how surprising your data would be if it were true. If a gap this large would turn up often by chance, you have no case. If it would turn up rarely, the assumption is uncomfortable, and you have evidence against it. Notice what this does not do: it never proves the interesting explanation, it only makes the dull one hard to hold.'
        ]) }),
        Object.freeze({ heading: 'What a p-value is not', paragraphs: Object.freeze([
          'A p-value is the probability of data at least this extreme, assuming there is no real difference. It is not the probability that there is no real difference, and it is not the probability that you are wrong. Those readings are common and they invert the conditional, which is exactly the mistake the previous session was about.',
          'It also carries no information about size. With enough rows, a difference far too small to matter will produce a tiny p-value, because the test is answering "could this be nothing" and not "is this worth doing anything about". A difference of a penny in average basket across two million sales is real and useless.'
        ]) }),
        Object.freeze({ heading: 'Ask the size question separately', paragraphs: Object.freeze([
          'Report the difference itself with a range around it, and let the reader see both whether it is distinguishable from zero and whether it is large enough to change a decision. Two point four seconds a scan across a shift is an operational fact; a p-value alone would not have told anybody that.',
          'Then decide in advance what would count. If you would act on a two-second gap and not a half-second one, say so before looking, because the alternative is deciding what counts after seeing which answer you got, and that is a decision the data has already influenced.'
        ]) })
      ]),
      example: Object.freeze({
        title: 'Two comparisons, one worth acting on',
        headers: Object.freeze(['Comparison', 'Difference', 'Distinguishable from zero', 'Worth acting on']),
        rows: Object.freeze([
          Object.freeze(['Self-service against staffed, seconds per scan', '2.4 s', 'Yes, on 40,000 scans', 'Yes, minutes per shift']),
          Object.freeze(['Northgate week on week, mean basket', '£0.31', 'No, the range spans zero', 'No']),
          Object.freeze(['Chain mean basket, quarter on quarter', '£0.02', 'Yes, on 850,000 sales', 'No']),
          Object.freeze(['Elasticity from nine observations', '−1.42', 'No, the interval is enormous', 'No'])
        ])
      }),
      workbook: Object.freeze({
        title: 'Fifteen-minute pre-registration',
        prompt: 'Choose a comparison you expect to make soon, at work or elsewhere.',
        steps: Object.freeze([
          'Write the dull explanation: the two things are the same.',
          'Write the size of difference that would actually change what you do.',
          'Write down how much data you will look at, before looking.',
          'Make the comparison and record the difference with a range.',
          'Answer the two questions separately: is it distinguishable from zero, and is it big enough to matter.'
        ])
      }),
      check: Object.freeze({
        prompt: 'A test on 850,000 sales returns a very small p-value for a two-pence difference in mean basket. What follows?',
        answer: 'real-but-small',
        options: Object.freeze([
          Object.freeze(['important', 'The difference is important, because the p-value is small']),
          Object.freeze(['real-but-small', 'The difference is probably real and almost certainly too small to act on']),
          Object.freeze(['no-difference', 'There is a 5% chance the difference does not exist'])
        ]),
        explanation: 'A small p-value speaks to whether a difference can be distinguished from zero, and says nothing at all about whether it is large enough to matter.'
      }),
      practice: Object.freeze({
        title: 'The Result Checkpoint',
        href: '?mode=game&mission=result-checkpoint',
        instruction: 'Put a finished figure through the checks that would catch it being an artefact rather than a finding.'
      }),
      sources: Object.freeze([
        Object.freeze({ label: 'OpenStax — Hypothesis Testing with One Sample', url: 'https://openstax.org/books/introductory-statistics-2e/pages/9-introduction', licence: 'CC BY 4.0' }),
        Object.freeze({ label: 'NIST/SEMATECH — What are statistical tests?', url: 'https://www.itl.nist.gov/div898/handbook/prc/section1/prc13.htm', licence: 'Permissive (US Government work)' })
      ])
    })
  ])
});
