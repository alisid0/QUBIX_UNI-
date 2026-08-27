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
  totalMinutes: 43,
  sessions: Object.freeze([
    Object.freeze({
      id: 'frequency-distribution', number: '01', title: 'From raw values to a distribution', studyMinutes: 5, playMinutes: 5,
      objective: 'Build and interpret frequency, relative-frequency and cumulative-frequency tables from raw values.',
      audioSummary: 'A raw list tells you what was recorded, but repeated values are difficult to see at a glance. A frequency table counts how often each value or interval occurs. Relative frequency divides each count by the total, so groups of different sizes can be compared. Cumulative relative frequency keeps a running total and answers threshold questions such as what percentage of baskets contain four items or fewer. These columns are different views of the same observations, and their totals provide useful checks: frequencies sum to the number of observations, relative frequencies sum to one or one hundred percent, and the final cumulative percentage is one hundred percent.',
      opening: 'Twelve basket sizes look like a string of numbers. Count their repetitions and a distribution appears: which values are common, which are rare and how much of the day lies below a threshold.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Frequency turns repetition into structure', paragraphs: Object.freeze([
          'A frequency is the number of times a value occurs. For discrete data such as items in a basket, list the observed values in order and count each one. The frequency column must sum to the number of observations; if it does not, something has been missed or counted twice.',
          'Continuous measurements usually need intervals rather than one row for every distinct decimal. Interval boundaries are analytical choices, just like histogram bins, and must cover every value exactly once without gaps or overlap.'
        ]) }),
        Object.freeze({ heading: 'Relative frequency makes the denominator visible', paragraphs: Object.freeze([
          'A count alone depends on how many observations were collected. Relative frequency divides a value’s frequency by the total number of observations. Three baskets out of twelve is 0.25, or 25 per cent. This converts the count into a share with a named denominator.',
          'Relative frequencies should sum to one, or 100 per cent. Small rounding differences are normal; a large difference is a warning that the table is incomplete or the denominator changed between rows.'
        ]) }),
        Object.freeze({ heading: 'Cumulative frequency answers “at most”', paragraphs: Object.freeze([
          'Cumulative frequency is a running total in value order. If one basket has one item and three have two items, then four baskets have two items or fewer. Cumulative relative frequency divides that running count by the total.',
          'The direction matters. Cumulative frequency through four items answers “four or fewer,” not “four exactly” and not “four or more.” The final cumulative row must contain every observation and therefore end at 100 per cent.'
        ]) })
      ]),
      figure: Object.freeze({ kind: 'frequency-table', values: Object.freeze([1,1,2,2,2,3,4,4]), caption: 'One set of baskets, four equivalent views', note: 'Frequency counts exact values; share divides by all eight baskets; “at most” accumulates every row through the current value.' }),
      example: Object.freeze({ title: 'Eight baskets become a distribution', headers: Object.freeze(['Items','Frequency','Relative frequency','Cumulative relative frequency']), rows: Object.freeze([
        Object.freeze(['1','2','2 ÷ 8 = 25%','25%']), Object.freeze(['2','3','3 ÷ 8 = 37.5%','62.5%']), Object.freeze(['3','1','1 ÷ 8 = 12.5%','75%']), Object.freeze(['4','2','2 ÷ 8 = 25%','100%'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute frequency audit', prompt: 'Collect twenty small whole-number observations, such as messages per hour or items per receipt.', steps: Object.freeze([
        'List every distinct value in ascending order.', 'Count its frequency and check the column sums to twenty.', 'Divide each frequency by twenty and express it as a percentage.', 'Build a cumulative percentage column.', 'Write one exact-value statement and one “at most” statement.'
      ]) }),
      exercise: Object.freeze({ id: 'build-basket-distribution', type: 'distribution-build', minutes: 7,
        title: 'Build the basket distribution', instruction: 'Count each value in the raw list. Then enter the cumulative percentage of all twelve baskets through that row. Answers allow 0.1 percentage-point rounding.',
        values: Object.freeze([1,2,2,2,3,3,4,4,4,4,5,5]),
        items: Object.freeze([
          Object.freeze({id:'one',label:'1 item',frequency:1,cumulative:8.3,tolerance:0.1,why:'One basket has one item; 1 ÷ 12 is 8.3%.'}),
          Object.freeze({id:'two',label:'2 items',frequency:3,cumulative:33.3,tolerance:0.1,why:'Four baskets have two items or fewer; 4 ÷ 12 is 33.3%.'}),
          Object.freeze({id:'three',label:'3 items',frequency:2,cumulative:50,tolerance:0.1,why:'Six of twelve baskets have three items or fewer.'}),
          Object.freeze({id:'four',label:'4 items',frequency:4,cumulative:83.3,tolerance:0.1,why:'Ten of twelve baskets have four items or fewer; 10 ÷ 12 is 83.3%.'}),
          Object.freeze({id:'five',label:'5 items',frequency:2,cumulative:100,tolerance:0.1,why:'The final row includes all twelve baskets and must end at 100%.'})
        ]), why:'The frequencies account for all twelve observations, and the cumulative column grows from the first row to exactly 100 per cent.'
      }),
      check: Object.freeze({ prompt: 'The cumulative relative frequency through four items is 83.3%. What does that mean?', answer: 'at-most', options: Object.freeze([
        Object.freeze(['exactly','83.3% of baskets contain exactly four items']), Object.freeze(['at-most','83.3% contain four items or fewer']), Object.freeze(['at-least','83.3% contain four items or more'])
      ]), explanation:'Cumulative frequency includes the current value and every smaller value, so it answers “four or fewer.”' }),
      practice: Object.freeze({ title: 'The Distribution Desk', href: '?mode=game&mission=distribution-desk', instruction: 'Take the counted distribution into a histogram, then test which features survive different bin widths.' }),
      sources: Object.freeze([
        Object.freeze({label:'OpenStax — Frequency and Frequency Tables',url:'https://openstax.org/books/introductory-statistics-2e/pages/1-3-frequency-frequency-tables-and-levels-of-measurement',licence:'CC BY 4.0'}),
        Object.freeze({label:'OpenStax — Histograms and Frequency Graphs',url:'https://openstax.org/books/introductory-statistics-2e/pages/2-2-histograms-frequency-polygons-and-time-series-graphs',licence:'CC BY 4.0'})
      ])
    }),
    Object.freeze({
      id: 'distribution', number: '02', title: 'Look at the shape before the summary', studyMinutes: 8, playMinutes: 5,
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
      id: 'centre-spread', number: '03', title: 'Centre is a choice', studyMinutes: 5, playMinutes: 5,
      objective: 'Calculate mean, median and mode, then choose the centre that answers the question honestly.',
      audioSummary: 'A measure of centre is not an automatic answer. The mean uses every value and preserves the total, but extreme values can pull it away from where most observations lie. The median is the middle ordered value and resists extremes, making it useful for skewed quantities such as prices and waiting times. The mode is the most frequent value or category, and may be the only meaningful centre for labels such as payment method. Start with the variable and the distribution, then choose the measure whose meaning matches the decision.',
      opening: 'Nine baskets are about twenty pounds and one is nine hundred. The mean says one hundred and eight. Not one basket was anywhere near it. The arithmetic is correct; the choice of centre is not.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Mean: every value has a vote', paragraphs: Object.freeze([
          'Add the values and divide by how many there are. Because every observation enters the total, the mean preserves an important identity: number of observations multiplied by the mean equals the total. That makes it useful for budgets, workloads and later methods built around squared deviations.',
          'The same property makes the mean sensitive to extremes. A single nine-hundred-pound order contributes forty-five times as much pull as a twenty-pound order. Use the mean when amounts combine meaningfully and the distribution is reasonably balanced; do not call it typical merely because software produced it.'
        ]) }),
        Object.freeze({ heading: 'Median: the ordered middle', paragraphs: Object.freeze([
          'Sort the values. With an odd count, the median is the middle value. With an even count, it is the mean of the two middle values. Half the observations lie at or below it and half at or above it, so changing an extreme value without crossing the middle may not change the median at all.',
          'That resistance makes the median a stronger description of a typical skewed quantity such as income, price or waiting time. Its trade-off is that it does not preserve the total: doubling a median does not tell you the combined amount.'
        ]) }),
        Object.freeze({ heading: 'Mode: the most common case', paragraphs: Object.freeze([
          'The mode is the value or category occurring most often. It can describe nominal categories, where adding and ordering make no sense: the modal payment method can be card, but there is no mean payment method. A dataset can have more than one mode, and a list in which every value occurs once has no useful mode.',
          'For a roughly symmetric, single-peaked numerical distribution, mean and median will be close. When they separate, the gap is evidence about shape. Do not hide that evidence by selecting whichever figure looks more convenient.'
        ]) })
      ]),
      example: Object.freeze({ title: 'One question does not have one universal middle', headers: Object.freeze(['Question', 'Best starting point', 'Why']), rows: Object.freeze([
        Object.freeze(['How much revenue per basket?', 'Mean', 'basket values combine to the total revenue']),
        Object.freeze(['What did a typical shopper spend?', 'Median', 'one trade order should not redefine the middle shopper']),
        Object.freeze(['Which payment method is most common?', 'Mode', 'payment method is categorical, not an amount'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute centre comparison', prompt: 'Use the twenty values from the previous session.', steps: Object.freeze([
        'Compute the mean, median and mode.', 'Write down which measures disagree, and what the gap says about the shape.', 'Change only the largest value to ten times its size and recompute.', 'Choose one centre for “typical” and one for planning the total; justify both.'
      ]) }),
      exercise: Object.freeze({ id: 'choose-an-honest-centre', type: 'decision-path', minutes: 6,
        title: 'Choose the centre the decision needs',
        instruction: 'The same checkout data supports different summaries. For each request, choose the measure whose mathematical meaning fits it.',
        scenario: Object.freeze({ title: 'Northgate checkout review', brief: 'Most baskets are modest, one trade customer places a very large order, and payment method is recorded as cash, card or voucher.' }),
        items: Object.freeze([
          Object.freeze({ id:'total', stage:'RESOURCE PLAN', prompt:'Finance needs expected total revenue from 1,000 comparable baskets. Which centre preserves the link to the total?', answer:'mean', options:Object.freeze([['mean','Mean basket value'],['median','Median basket value'],['mode','Modal basket value']]), why:'Count × mean reconstructs the total, so the mean matches an additive planning question.', retry:'Ask which measure, multiplied by the number of baskets, reconstructs total revenue.' }),
          Object.freeze({ id:'typical', stage:'CUSTOMER STORY', prompt:'The manager wants the spend of a typical shopper without letting one trade order dominate.', answer:'median', options:Object.freeze([['mean','Mean basket value'],['median','Median basket value'],['mode','Modal basket value']]), why:'The ordered middle resists the extreme trade order and describes the centre of this skewed distribution.', retry:'Ask which measure can stay stable when an extreme value becomes much larger.' }),
          Object.freeze({ id:'category', stage:'TILL DESIGN', prompt:'Product needs to preselect the payment method used most often.', answer:'mode', options:Object.freeze([['mean','Mean payment method'],['median','Median payment method'],['mode','Modal payment method']]), why:'Payment method is nominal. The most frequent category is meaningful; arithmetic on its labels is not.', retry:'This variable contains categories with no numerical order. Choose the measure that counts the most common label.' })
        ]), why:'A centre is chosen from the meaning of the variable and the decision—not from a fixed hierarchy of “best” statistics.'
      }),
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
        Object.freeze({ label: 'OpenStax — Measures of the Center of the Data', url: 'https://openstax.org/books/introductory-statistics-2e/pages/2-5-measures-of-the-center-of-the-data', licence: 'CC BY 4.0' }),
        Object.freeze({ label: 'Government Analysis Function — data visualisation and charts', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' })
      ])
    }),

    Object.freeze({
      id: 'spread', number: '04', title: 'Measuring spread', studyMinutes: 5, playMinutes: 5,
      objective: 'Construct a five-number summary and choose between range, IQR and standard deviation.',
      audioSummary: 'A centre without spread hides how different the observations are. The range is maximum minus minimum and depends entirely on two values. A five-number summary records the minimum, first quartile, median, third quartile and maximum. The interquartile range is Q3 minus Q1 and describes the width of the middle half, so it resists extreme values. Variance averages squared deviations from the mean; sample variance uses n minus one when estimating a population. Standard deviation is the square root of variance and returns the result to the original units. Pair median with IQR for skewed data, and usually pair mean with standard deviation for a roughly symmetric distribution.',
      opening: 'Two branches can share a mean of forty baskets an hour. One stays between thirty-five and forty-five; the other swings between zero and two hundred. Centre says they are the same. Spread says they are different businesses.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Range sees only the ends', paragraphs: Object.freeze([
          'The range is maximum minus minimum. It is quick, keeps the original unit and tells you the full observed span. It is also determined by exactly two values, so one error or unusual case can transform it while every other observation stays unchanged.',
          'A value far from the rest is therefore a question, not a deletion instruction. Check whether it is an error, a genuine rare event or evidence of another population. If it is excluded, record the rule and report that the analysed population changed.'
        ]) }),
        Object.freeze({ heading: 'The middle half: quartiles and IQR', paragraphs: Object.freeze([
          'Order the values. The five-number summary is the minimum, first quartile, median, third quartile and maximum. Here we use the median-of-halves convention: after finding the overall median, Q1 is the median of the lower half and Q3 the median of the upper half.',
          'The interquartile range, IQR, is Q3 minus Q1. It contains the middle fifty per cent of ordered observations and is resistant to extreme ends. Pairing median and IQR gives a coherent description of a skewed distribution because both are based on position rather than distance from the mean.'
        ]) }),
        Object.freeze({ heading: 'Variance and standard deviation use every distance', paragraphs: Object.freeze([
          'Subtract the mean from every value to get deviations. Positive and negative deviations cancel, so variance squares them before averaging. Population variance divides by the population size; sample variance commonly divides by n minus one when the sample is being used to estimate population variability.',
          'Variance is expressed in squared units, which makes it hard to interpret directly. Standard deviation takes the square root and returns to the original unit. It is useful with the mean for roughly symmetric data, but like the mean it reacts strongly to extremes. There is no universally best spread: match it to the shape and the centre you report.'
        ]) })
      ]),
      figure: Object.freeze({ kind:'five-number-summary', values:Object.freeze([3,4,5,5,6,7,8,10]), caption:'Eight values become five landmarks', note:'Using the median-of-halves convention: Q1 is 4.5, the median is 5.5, Q3 is 7.5, and the IQR—the width of the middle half—is 3.' }),
      example: Object.freeze({ title:'Three measures answer different spread questions', headers:Object.freeze(['Measure','Calculation','What it describes','Sensitive to extremes?']), rows:Object.freeze([
        Object.freeze(['Range','maximum − minimum','the full observed span','very']), Object.freeze(['IQR','Q3 − Q1','the middle 50%','less']), Object.freeze(['Standard deviation','square root of average squared deviation','distance around the mean','yes'])
      ]) }),
      workbook: Object.freeze({ title:'Twenty-minute spread comparison', prompt:'Use the same ordered observations twice: first as recorded, then with the maximum multiplied by ten.', steps:Object.freeze([
        'Find the five-number summary using the median-of-halves convention.', 'Calculate the range and IQR.', 'Change only the maximum and calculate them again.', 'Explain which measure moved and choose the one you would pair with the median.'
      ]) }),
      exercise: Object.freeze({ id:'construct-five-number-summary', type:'five-number-build', minutes:8,
        title:'Construct the five-number summary', instruction:'Use the median-of-halves convention. Enter the five landmarks, then derive the IQR and range. Decimals are allowed.',
        values:Object.freeze([2,4,5,7,8,10,12,14]),
        items:Object.freeze([
          Object.freeze({id:'min',label:'Minimum',answer:2,why:'The ordered list begins at 2.',retry:'Read the first value in the ordered list.'}),
          Object.freeze({id:'q1',label:'First quartile · Q1',answer:4.5,why:'The lower half is 2, 4, 5, 7; its middle is (4 + 5) ÷ 2 = 4.5.',retry:'Take the median of the lower four values: 2, 4, 5 and 7.'}),
          Object.freeze({id:'median',label:'Median',answer:7.5,why:'The two central values are 7 and 8; their mean is 7.5.',retry:'With eight observations, average the fourth and fifth values.'}),
          Object.freeze({id:'q3',label:'Third quartile · Q3',answer:11,why:'The upper half is 8, 10, 12, 14; its middle is (10 + 12) ÷ 2 = 11.',retry:'Take the median of the upper four values: 8, 10, 12 and 14.'}),
          Object.freeze({id:'max',label:'Maximum',answer:14,why:'The ordered list ends at 14.',retry:'Read the last value in the ordered list.'}),
          Object.freeze({id:'iqr',label:'Interquartile range',answer:6.5,why:'IQR = Q3 − Q1 = 11 − 4.5 = 6.5.',retry:'Subtract Q1 from Q3.'}),
          Object.freeze({id:'range',label:'Range',answer:12,why:'Range = maximum − minimum = 14 − 2 = 12.',retry:'Subtract the minimum from the maximum.'})
        ]), why:'The five landmarks are consistent with the ordered list, and the two derived spreads use the correct endpoints.'
      }),
      check: Object.freeze({ prompt:'A highly skewed distribution is reported with its median. Which spread forms the most coherent pair?', answer:'iqr', options:Object.freeze([
        Object.freeze(['range','Range, because it includes both extremes']), Object.freeze(['iqr','IQR, because both measures depend on ordered position and resist extremes']), Object.freeze(['variance','Variance, because squared units are easier to interpret'])
      ]), explanation:'Median and IQR are both resistant summaries based on position. Mean and standard deviation are the usual corresponding pair when the distribution is reasonably symmetric.' }),
      practice: Object.freeze({ title:'The Distribution Desk', href:'?mode=game&mission=distribution-desk', instruction:'Compare centre and spread while changing the histogram width; neither statistic replaces seeing the shape.' }),
      sources: Object.freeze([
        Object.freeze({label:'OpenStax — Measures of the Location of the Data',url:'https://openstax.org/books/introductory-statistics-2e/pages/2-3-measures-of-the-location-of-the-data',licence:'CC BY 4.0'}),
        Object.freeze({label:'OpenStax — Measures of the Spread of the Data',url:'https://openstax.org/books/introductory-statistics/pages/2-7-measures-of-the-spread-of-the-data',licence:'CC BY 4.0'})
      ])
    }),

    Object.freeze({
      id: 'sampling', number: '05', title: 'Who is in the data, and who is not', studyMinutes: 5, playMinutes: 5,
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
      id: 'probability', number: '06', title: 'The language of chance', studyMinutes: 5, playMinutes: 5,
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
