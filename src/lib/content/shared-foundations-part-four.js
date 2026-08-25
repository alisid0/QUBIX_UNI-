// Volume 0, chapter 04. Statistics before models.
//
// The point of the chapter is in its title. Every technique later in the
// curriculum assumes a learner can look at a set of values and say what shape
// it has, where its middle is, how spread out it is, and whether the sample in
// front of them can speak for the population they care about. A model built on
// top of someone who cannot do that is a model nobody can check.

export const SHARED_FOUNDATIONS_PART_FOUR = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-FOUR',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'Statistics Before Models',
  subtitle: 'Part Four of Volume 0',
  totalMinutes: 250,
  sessions: Object.freeze([
    Object.freeze({
      id: 'distribution', number: '01', title: 'Look at the shape before the summary', studyMinutes: 35, playMinutes: 25,
      objective: 'Describe a set of values by its shape, and say what a single summary of it would hide.',
      opening: 'Two branches both average forty baskets an hour. One is steady all day. The other is empty until five and then overwhelmed. The average is identical and the staffing decision is not.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A distribution is the whole set of values', paragraphs: Object.freeze([
          'A distribution is simply which values occurred and how often. Before any statistic is computed, it is worth drawing: values across, counts up. The picture answers questions that no single number can, and it answers them faster than a table of the same data.',
          'The shape is the first thing to name. Values may cluster around one centre, or around two, or pile up at one end with a long tail stretching away from it. Each of those shapes makes different summaries sensible, so the shape has to come first.'
        ]) }),
        Object.freeze({ heading: 'Bins are a choice, not a fact', paragraphs: Object.freeze([
          'Drawing a histogram means grouping values into intervals, and the width of those intervals is chosen by whoever draws it. Wide bins smooth the picture until structure disappears; narrow bins scatter it into noise. The same data can look like one hump or three depending on a decision nobody records.',
          'The honest habit is to try more than one width and see which features survive. A gap that appears at every width is probably real. A second peak that appears at exactly one width probably is not.'
        ]) }),
        Object.freeze({ heading: 'What a summary throws away', paragraphs: Object.freeze([
          'Every summary is a deliberate loss of information, exchanged for something you can say in a sentence. That is a good trade as long as you know what was discarded. An average discards the shape, a total discards how it accumulated, and a maximum discards everything except one value.',
          'The rule that follows is simple: look at the distribution first, then choose the summary that survives it. Choosing the summary first and never looking is how a bimodal day becomes a staffing plan for a day that never happens.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Same mean, different day', headers: Object.freeze(['Branch', 'Shape', 'Mean baskets/hour', 'Decision it supports']), rows: Object.freeze([
        Object.freeze(['B-08', 'flat all day', '40', 'steady staffing']),
        Object.freeze(['B-17', 'quiet, then a sharp evening peak', '40', 'concentrate staff after 17:00']),
        Object.freeze(['Both', 'invisible in the summary', 'identical', 'the mean cannot tell them apart'])
      ]) }),
      figure: Object.freeze({
        kind: 'histogram', case: 'baskets', width: 10,
        caption: 'Figure 1 · Forty Saturday baskets at Northgate',
        note: 'Drawn by the same function the Distribution Desk draws with, at the same bin width. The mean sits to the right of almost every basket, because a few large ones pull it there.'
      }),
      rehearsal: Object.freeze({
        mission: 'distribution-desk',
        lead: 'The first case in the mission at the end of this session is a real request with real numbers. Look at the values before you meet the histogram.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'baskets',
            facts: Object.freeze([
              Object.freeze(['What was asked', 'What is a typical basket at Northgate?']),
              Object.freeze(['The sample', 'Forty baskets from one Saturday afternoon.']),
              Object.freeze(['Smallest and largest', '6 · 210']),
              Object.freeze(['Bin widths you can try', '5 · 10 · 25'])
            ]),
            question: 'Forty values running from 6 to 210. Before drawing anything, where do you expect most of them to sit, and what will the few at the top do to a mean?',
            answer: 'Most sit low, and the few large ones drag the mean above them.',
            why: 'Most baskets sit under £30 and a handful stretch to £210. The tail is long and it is all on one side. A mean has to be somewhere between the crowd and the outliers, which means it lands where almost no actual basket is, and answering "typical" with it would describe a basket nobody had.'
          })
        ]),
        closing: 'The mission lets you redraw this at three bin widths. A feature that survives all three is in the data; one that appears at a single width is in the drawing.'
      }),
      workbook: Object.freeze({ title: 'Twenty-minute shape sketch', prompt: 'Collect twenty values of something you can count: messages per day, minutes of a commute, spend per shop.', steps: Object.freeze([
        'Draw them as a histogram by hand, choosing any bin width.',
        'Redraw with bins twice as wide, and again with bins half as wide.',
        'Write down which features appear in all three drawings.',
        'Write one sentence describing the shape without using the word average.'
      ]) }),
      check: Object.freeze({
        prompt: 'A histogram shows two clear peaks. Someone reports the mean. What is the problem?',
        answer: 'between',
        options: Object.freeze([
          ['wrong', 'The mean has been calculated incorrectly'],
          ['between', 'The mean falls between the peaks and describes neither group'],
          ['none', 'No problem: the mean is always a valid summary']
        ]),
        explanation: 'With two clusters the mean lands in the gap, describing a typical case that does not occur. The right answer is to report the two groups, or to find what separates them.'
      }),
      practice: Object.freeze({ title: 'The Distribution Desk', href: '?mode=game&mission=distribution-desk', instruction: 'Draw the values at three bin widths and see which features survive all of them.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Government Analysis Function — data visualisation and charts', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' }),
        Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
      ])
    }),

    Object.freeze({
      id: 'centre-spread', number: '02', title: 'Centre, spread and the values that break them', studyMinutes: 35, playMinutes: 25,
      objective: 'Choose a measure of centre and spread that suits the shape, and justify the choice.',
      opening: 'Nine baskets of about twenty pounds and one of nine hundred. The mean says one hundred and eight. Not one basket was anywhere near it.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Three middles, and when each is honest', paragraphs: Object.freeze([
          'The mean adds everything and divides by the count, so every value pulls on it in proportion to its size. The median is the value in the middle when they are sorted, so it moves only when the middle moves. The mode is whichever value occurs most, which is often the only sensible middle for categories.',
          'For a roughly symmetric distribution these agree, and the mean is the usual choice because later mathematics is built on it. For a skewed one they disagree, and the disagreement is the information: a mean far above a median says a long tail is pulling it.'
        ]) }),
        Object.freeze({ heading: 'Spread is not optional', paragraphs: Object.freeze([
          'A centre without a spread is half a description. The range is the simplest measure and the most fragile, since it is defined entirely by the two most extreme values. Quartiles cut the sorted values into four, so the middle half is described by a figure that ignores the ends. Standard deviation summarises typical distance from the mean, and inherits the mean’s sensitivity.',
          'Reporting a centre alone invites the reader to imagine a spread, and they will imagine a small one. Two branches averaging forty baskets an hour, one ranging thirty-five to forty-five and one ranging zero to two hundred, are different businesses.'
        ]) }),
        Object.freeze({ heading: 'An outlier is a question, not a verdict', paragraphs: Object.freeze([
          'A value far from the rest may be an error, or it may be the most important row in the table. A nine-hundred-pound basket could be a mistyped quantity, a genuine trade order, or a fraud. Deleting it because it is inconvenient decides the question without investigating it.',
          'So flag it, investigate it, and record what you concluded. If it is removed, say so and say why, because a summary computed on a filtered set is a summary of a different population than the one the reader assumes.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Ten baskets, one unusual', headers: Object.freeze(['Measure', 'Value', 'What it is telling you']), rows: Object.freeze([
        Object.freeze(['Mean', '£108', 'dragged upward by a single basket']),
        Object.freeze(['Median', '£21', 'the typical basket, unmoved']),
        Object.freeze(['Range', '£9 to £900', 'dominated by the two extremes']),
        Object.freeze(['Middle half', '£17 to £24', 'where most baskets actually sit'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute centre comparison', prompt: 'Use the twenty values from the previous session.', steps: Object.freeze([
        'Compute the mean and the median.',
        'Write down which is larger, and what that says about the tail.',
        'Find the largest value and decide whether it is an error, a rarity or normal.',
        'Recompute both without it, and write one sentence on what changed.'
      ]) }),
      check: Object.freeze({
        prompt: 'For house prices in a town, the mean is £480,000 and the median is £265,000. What does the gap indicate?',
        answer: 'tail',
        options: Object.freeze([
          ['error', 'One of the two figures has been miscalculated'],
          ['tail', 'A few very expensive houses are pulling the mean upward'],
          ['spread', 'The prices are evenly spread across a wide range']
        ]),
        explanation: 'The mean is sensitive to large values and the median is not, so a mean far above a median is the signature of a long upper tail. For a typical price, the median is the honest figure to quote.'
      }),
      practice: Object.freeze({ title: 'The Distribution Desk', href: '?mode=game&mission=distribution-desk', instruction: 'Choose a centre and a spread the shape can actually support.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Government Analysis Function — data visualisation and charts', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' }),
        Object.freeze({ label: 'NIST — SI units', url: 'https://www.nist.gov/pml/owm/metric-si/si-units' })
      ])
    }),

    Object.freeze({
      id: 'sampling', number: '03', title: 'Who is in the data, and who is not', studyMinutes: 35, playMinutes: 25,
      objective: 'Name the population a dataset can speak for, and the ways it may fail to.',
      opening: 'A satisfaction survey on the website gives ninety-two per cent positive. Everybody who could not use the website is not in it, and that is the group the question was really about.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Population, sample and frame', paragraphs: Object.freeze([
          'The population is everyone or everything the question is about. The sample is the part actually measured. The frame is the list the sample was drawn from, and it is the part most often ignored. A survey of loyalty-card holders has a frame of card holders, whatever population it claims to describe.',
          'Naming all three before computing anything is the whole discipline. Most arguments about a statistic are really arguments about which of the three the number describes.'
        ]) }),
        Object.freeze({ heading: 'How samples mislead', paragraphs: Object.freeze([
          'Selection bias means the sample was drawn in a way that favours some members: a queue survey at midday misses everybody who works. Non-response bias means those who did not answer differ from those who did, and the people most annoyed are often the least likely to fill in a form. Survivorship bias means the cases that failed are absent, so a study of shops still trading says nothing about the ones that closed.',
          'None of these is fixed by collecting more of the same data. A larger biased sample is a more precise wrong answer, which is more dangerous than a small one because it looks more convincing.'
        ]) }),
        Object.freeze({ heading: 'Variation is not the same as error', paragraphs: Object.freeze([
          'Two samples from the same population give different answers, and that difference is not a mistake. It is sampling variation, and it shrinks as samples get larger. This is why a figure quoted without any indication of how much it could move is an incomplete figure.',
          'The practical form of this in daily work is modest: be suspicious of small movements between periods, quote the counts behind the rates, and expect the smallest group in a table to move the most for no reason at all.'
        ]) })
      ]),
      example: Object.freeze({ title: 'One question, three populations', headers: Object.freeze(['Method', 'Frame it actually samples', 'Cannot speak for']), rows: Object.freeze([
        Object.freeze(['Website pop-up', 'visitors who reached the site', 'anyone who could not use it']),
        Object.freeze(['Till receipt code', 'customers who completed a purchase', 'those who left without buying']),
        Object.freeze(['Loyalty card email', 'members who opted in', 'occasional and cash customers'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute frame check', prompt: 'Find a survey result quoted anywhere: a product rating, a poll, a workplace figure.', steps: Object.freeze([
        'Write down the population the claim is about.',
        'Write down who could actually have been measured.',
        'Name one group present in the first but missing from the second.',
        'Say whether that group would be likely to answer differently, and why.'
      ]) }),
      check: Object.freeze({
        prompt: 'An in-store survey runs on weekday mornings and finds most shoppers are retired. What is the safest conclusion?',
        answer: 'frame',
        options: Object.freeze([
          ['population', 'Most of the shop’s customers are retired'],
          ['frame', 'Most weekday-morning shoppers are retired, which may not describe all customers'],
          ['invalid', 'The survey is worthless and should be discarded']
        ]),
        explanation: 'The sample is fine for the frame it was drawn from. It simply cannot speak for evenings and weekends, when people who work are able to shop.'
      }),
      practice: Object.freeze({ title: 'What Does One Row Represent?', href: '?mode=game&mission=table-grain', instruction: 'A population is a grain statement in disguise: name the unit before counting how many there are.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' }),
        Object.freeze({ label: 'Government Analysis Function — releasing statistics in spreadsheets', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/releasing-statistics-in-spreadsheets/' })
      ])
    }),

    Object.freeze({
      id: 'probability', number: '04', title: 'The language of chance', studyMinutes: 40, playMinutes: 30,
      objective: 'State what a probability is attached to, and read a conditional claim in the right direction.',
      opening: 'A test that is ninety-nine per cent accurate returns a positive result. Whether that means you are probably affected depends on something the sentence does not mention: how common the thing is.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A probability belongs to an event', paragraphs: Object.freeze([
          'A probability is a number between nought and one attached to a stated event: this delivery arrives late, this basket contains a promotion, this reading exceeds the threshold. The event has to be said out loud, because most confusion about probability is confusion about which event is being discussed.',
          'The complement is the same event not happening, and the two must sum to one. That single constraint catches a surprising number of errors, because it forces you to say what the alternative actually is.'
        ]) }),
        Object.freeze({ heading: 'Conditional probability has a direction', paragraphs: Object.freeze([
          'The chance of a positive test given that something is present is not the chance that something is present given a positive test. They are different questions with different answers, and swapping them is the most consequential everyday mistake in the subject.',
          'The bridge between the two is how common the thing is to begin with. If very few deliveries are late, then most alerts about late deliveries will be false alarms even from a good detector, simply because there are so many more on-time deliveries to raise them.'
        ]) }),
        Object.freeze({ heading: 'Independence is an assumption', paragraphs: Object.freeze([
          'Two events are independent when knowing one happened tells you nothing about the other. Multiplying probabilities together is only valid then, which makes independence the assumption most often made silently and most often wrong. Two tills failing in one branch are not independent if they share a power supply.',
          'The habit worth forming is to state the assumption whenever the arithmetic depends on it. A stated assumption can be challenged and tested; a silent one gets built on.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Ten thousand deliveries, a good detector', headers: Object.freeze(['Group', 'Count', 'Flagged late']), rows: Object.freeze([
        Object.freeze(['Actually late (1%)', '100', '99 correctly flagged']),
        Object.freeze(['Actually on time (99%)', '9,900', '99 wrongly flagged']),
        Object.freeze(['So of 198 flags', '198', 'only half are really late'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute two-way table', prompt: 'Take any alert you receive: a fraud warning, a spam filter, a weather alert.', steps: Object.freeze([
        'Estimate how often the thing being detected really happens.',
        'Draw a two-by-two table of happened or not, against flagged or not.',
        'Fill in a thousand cases using your estimate.',
        'Count what fraction of the flags are correct, and compare it with the accuracy claimed.'
      ]) }),
      check: Object.freeze({
        prompt: 'A late-delivery detector is 99% accurate, and 1% of deliveries are late. A delivery is flagged. Roughly how likely is it to be late?',
        answer: 'half',
        options: Object.freeze([
          ['ninety-nine', 'About 99%, because the detector is 99% accurate'],
          ['half', 'About 50%, because false alarms from the large on-time group match the true flags'],
          ['one', 'About 1%, because only 1% of deliveries are late']
        ]),
        explanation: 'Among 10,000 deliveries, 99 of the 100 late ones are flagged, and 1% of the 9,900 on-time ones gives another 99 false flags. Of 198 flags, about half are genuine.'
      }),
      practice: Object.freeze({ title: 'The Distribution Desk', href: '?mode=game&mission=distribution-desk', instruction: 'Judge which sentence eight values can support, and which needs more of them.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Government Analysis Function — communicating uncertainty', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/' }),
        Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
      ])
    })
  ])
});
