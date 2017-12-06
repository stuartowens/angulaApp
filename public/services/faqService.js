angular.module('main-app')

.service('faqService', function($http, $location) {

  this.dataCompile = function(){
    faqData = [
      {
        question: 'What are the dates of camp? And where is camp located?',
        answer: 'Our BandCamps in 2018 will be held twice. Our spring BandCamp is the week directly after Merlefest, starting Sunday afternoon April 29, 2018 and ending Thursday afternoon, May 3, 2018. Our fall BandCamp is going to be the week before the Kruger Brothers festival, Carolina In The Fall, which happens in nearby Wilkesboro, NC, starting Sunday afternoon, September 16, 2018 and finishing up Thursday afternoon, September 20, 2018. Keep in mind that the IBMA (the International Bluegrass Music Association) yearly festival and trade show starts the following week in Raleigh, NC. The camp is located at Camp Harrison, a wonderful YMCA camp in Boomer, NC, near Wilkesboro, NC. There is cabin lodging, a great dining hall and other great amenities, all set in the beautiful mountains of western North Carolina.'
      },
      {
        question: 'When should I plan to arrive and leave?',
        answer: 'You can arrive starting at 2pm on the Sunday beginning day of camp, with activities beginning at 6pm, and camp will end early afternoon on the Thursday of camp. We will be starting Sunday afternoon and evening doing playing and jamming so that our instructors can start deciding how to group the participants each into a band of four to six people, so Sunday afternoon arrival would be best, as we’ll start fairly early Monday.'
      },
      {
        question: 'What should I bring to the camp?',
        answer: 'Things like: Your instrument(s). Extra strings, picks, capos, etc. Song lyrics of things you might want to sing. Original songs if you have them and lyric sheets. Bedding for your cabin bunk. Any meds you might need. Toiletries, Clothes for warm and cold weather conditions. (There is a wide range between day and nighttime temperatures) Rain gear, A great positive attitude!!!'
      },
      {
        question: 'Can I come without a band?',
        answer: 'Sure! This camp is for people who want to learn more about being in a band, or groups of people interested in starting a band.'
      },
      {
        question: 'Can my whole band come?',
        answer: 'Sure, that would be great!!!'
      },
      {
        question: 'How proficient do I need to be with my instrument?',
        answer: 'We don’t expect people to be at a high professional level, but you should be able to learn new songs quickly, play at a level where you would be comfortable playing at a local basic gig like a coffee shop or other public performance.'
      },
      {
        question: 'Are there any prerequisites?',
        answer: 'You should be at a level of playing and or singing which you are comfortable in a basic jam session, this isn’t a “jam” camp, we will be concentrating on preparing you to be at a level of playing in a group which hopes to play gigs or at least play together in settings in front of people.'
      },
      {
        question: 'How much does camp cost?',
        answer: 'BandCamp is $379 per person for camp tuition and lunches, and $279 per person for cabin lodging and meals. The lodging is in typical “bunkhouse” rooms, very nice, with multiple beds and a bath area for each room. RV camping with meals is $199 per person. Tent camping with meals is $150 per person. If you want to stay offsite and only do BandCamp and lunch, then lunch is included in the BandCamp fee, but we don’t recommend it. There will be nightly homework sessions and such for each band to work together and probably some jamming onsite. If you are staying at the camp but are not paying tuition to attend classes, you can pay an additional $50 for a lunch package. There is a $35 discount if you register and pay in-full before Feb. 15, 2018.'
      },
      {
        question: 'Can I bring a family member that will not be participating?',
        answer: 'Yes, non BandCamp people can attend. Please see registration form for food and lodging costs. But if they are a musician who plans to play in jams at night and such them we would be very likely to strongly suggest they sign up for camp, as this is kind of a “music boot camp” and distractions might be a problem.'
      },
      {
        question: 'Are friends and family allowed at camp sessions?',
        answer: 'This would be on a case by case basis. Kids under 16 should be chaperoned, so there’s that, but in general keep in mind that this is like school, the schedule will be tight, and we really don’t need distractions and space may be an issue.'
      },
      {
        question: 'I am under 18. Can I attend the camp? What is the minimum age for campers? ',
        answer: 'There is no minimum age, but minors under 16 must be accompanied by a guardian. All attendees 18 and under must have the “Minor Release Form” filled out by their parent/guardian prior to attending the camp. This form can be found on the registration page.'
      },
      {
        question: 'What is the cancellation policy?',
        answer: 'The cancellation policy will be fairly strict, as we will be planning the groupings long before the camp begins. Refunds of the balance paid, minus $75 is refundable up to 2 weeks prior to camp. If cancellation is in the 2 weeks prior to camp, your balance (minus $75) will be credited toward the next BandCamp, and is only available for a BandCamp within the next year. If cancellation is in the 3 days prior to camp, no refunds will be given for any reason. Registrations are transferable to friends and family members only after discussing it with the BandCamp office. '
      },
      {
        question: 'What is the deadline for signing up? ',
        answer: 'There will be a $35 discount for signing up before Feb 15, 2018 for our fall BandCamp, and July 1, 2018 for our fall BandCamp.'
      },
      {
        question: 'What kind of instructors are at BandCamp?',
        answer: 'All the instructors for BandCamp will be professional musicians and teachers and there will be various panelists from the industry who are highly experienced in the music business.'
      },
      {
        question: 'What topics are covered at the camp?',
        answer: 'The main goal of BandCamp is to help people move from jamming or just playing on their own towards playing in an organized group. The goal of most organized groups is to work towards “playing out”, playing in front of people either for free or for money. To do this, people eventually learn, by hands on experience, about things like organizing material, arrangements, finding people to play with, finding gigs or places to play for experience, pictures, press kits, bios, how to set up and play over a pa system, stage presence, MC work, getting along with people, how to quit or move someone gracefully out of the group, writing songs or finding original songs for the group, singing and harmonies, instrumental organization of songs, travel and transportation, keeping your instruments healthy, keeping yourself happy and healthy and so on. Of course, in a four day BandCamp we can’t cover all these things completely, but we will plan to deal with topics so that our campers can learn to learn on their own and understand the basic concepts.'
      },
      {
        question: 'What will a typical day look like?',
        answer: 'BandCamp will be divided about 50/50 into class type instruction with the whole camp present and playing with your assigned band grouping to work on two songs which our instructors will help each band organize and arrange at a level where they could be played out in a public setting. We plan to help each grouping have one original song and one cover song. In the evenings we will encourage the groups to work on their songs and arrangements, but there will likely be some jamming and such too.'
      },
      {
        question: 'What time do camp sessions begin on the first day?',
        answer: 'You can arrive Sunday at Camp Harrison anytime after 2 pm and we will begin doing some playing and organizing of the groupings. Formal activities begin at 6 pm. We will be starting Sunday afternoon and evening doing playing and jamming so that our instructors can start deciding how to group the participants each into a band of four to six people, so Sunday afternoon arrival would be best, as we’ll start fairly early Monday.'
      },
      {
        question: 'What time do camp activities end on the last day?',
        answer: 'Around 2pm on Thursday. What music genres are welcome at camp? Is camp for acoustic and electric musicians? Genres are not limited, but the camp is based around acoustic musicians due to issues with space and noise. Electric bass is ok, but we aren’t really planning on electric groupings at this point, but the concepts all apply to pretty much all genres.'
      },
      {
        question: 'Can I bring alcohol to camp?',
        answer: 'Camp Harrison does not allow alcohol on premises.'
      },
      {
        question: 'Are pets allowed?',
        answer: 'Other than service animals, no pets will be allowed.'
      },
      {
        question: 'Are linens/pillows provided for cabin lodging?',
        answer: 'No they are  not provided, you must bring your own'
      },
      {
        question: 'Are cabins heated?',
        answer: 'Yes they are heated'
      },
      {
        question: 'Are showers available?',
        answer: 'Yes, each cabin has it’s own private bath for the campers in that cabin.'
      },
      {
        question: 'Are cabins cleaned daily?',
        answer: 'No they are not cleaned daily'
      },
      {
        question: 'Are RV hookups available?',
        answer: 'Yes RV Hookups are available'
      },
      {
        question: 'If I am staying in an RV or tent, can I use the camp\'s showers?',
        answer: 'Yes you can use the camp showers'
      },
      {
        question: 'Do you provide RVs and Tents?',
        answer: 'No, payment is for staying in an and RV or tent space. Campers must bring their own RVs or tents.'
      },
      {
        question: 'I am sharing an RV or Tent with another person. Do I also need to pay for a separate RV or Tent package?',
        answer: 'Yes. Each person staying at camp must pay for a separate tent or RV package, even if you will be sharing a tent or RV. '
      },
      {
        question: 'Can I stay off-campus?',
        answer: 'Yes but the schedule would dictate that not to be a great idea. Since each person is in a specific grouping and a large part of the camp is about that grouping learning together, each person will be important to their group and it would impact severely the productivity of that group to have a member late or missing. And there will be group homework and nightly playing or jams. The nearest hotels are about 30 minutes away.'
      },
      {
        question: 'I have dietary needs/allergies. Can they be accommodated?',
        answer: 'We will work with you as best we can to accommodate those kinds of issues.'
      }
    ]
    faqData.map(function(ele,i, arr) {
      var num = i + 1;
      ele['heading_id'] = "heading" + num
      ele['collapse_id'] = "collapse" + num
      ele['href_id'] = "#collapse" + num
      ele['collapsed'] = false;

    })
    return faqData
    // heading_id = "heading".concat(faqNumber)
    // collapse_id: "collapseThree",
    // href_id: "#collapseThree",
    // console.log(heading_id)
  }
  this.ngStyle = function(collapsed) {
    if(collapsed) {
      let myStyles = {
        'color': 'red',
      }
    } else {
      let myStyles = {
        'color': 'black'
      }
    }
    return myStyles
  };
  this.ngClick = (collapsed)=>{
    return !collapsed
  };
});
