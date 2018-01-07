angular.module('main-app')

.service('faqService', function($http, $location) {

  this.dataCompile = function(){
    faqData = [
      {
        question: 'What are the dates of camp? And where is camp located?',
        answer: 'Our BandCamps in 2018 will be held twice. Our spring BandCamp is the week directly after Merlefest, starting Sunday afternoon April 29, 2018 and ending Thursday morning, May 3, 2018. Our fall BandCamp is going to be the week before the Kruger Brothers festival, Carolina In The Fall, which happens in nearby Wilkesboro, NC, starting Sunday afternoon, September 16, 2018 and finishing up Thursday morning, September 20, 2018. Keep in mind that the IBMA (the International Bluegrass Music Association) yearly festival and trade show starts the following week in Raleigh, NC. The camp is located at Camp Harrison, a wonderful YMCA camp in Boomer, NC, near Wilkesboro, NC. There is cabin lodging, a great dining hall and other great amenities, all set in the beautiful mountains of western North Carolina.'
      },
      {
        question: 'When should I plan to arrive and leave?',
        answer: 'You can arrive any time after 5pm on Sunday, the first day of camp. Activities begin at 6pm, and camp will end at 11am Thursday. We will start playing and jamming Sunday evening so that our instructors can decide how to group the participants into bands of four to six people. We’ll start again fairly early Monday morning.'
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
        answer: 'We don’t expect people to be at a high professional level, but you should be able to learn new songs quickly, play at a level where you would be comfortable playing at an open mic.'
      },
      {
        question: 'Are there any prerequisites?',
        answer: 'You should be at a level at which you are comfortable in a basic jam session, this isn’t a “jam” camp, we are a "band" camp.'
      },
      {
        question: 'How much does camp cost?',
        answer: 'BandCamp is $379 per person for camp tuition and lunches, and $279 per person for cabin lodging and meals. The lodging is in typical “bunkhouse” rooms, very nice, with multiple beds and a bath area for each room. RV camping with meals is $199 per person. Tent camping with meals is $150 per person. If you want to stay offsite and only do BandCamp and lunch, then lunch is included in the BandCamp fee, but we don’t recommend it. There will be nightly homework sessions and such for each band to work together and probably some jamming onsite. If you are staying at the camp but are not paying tuition to attend classes, you can pay an additional $50 for a lunch package. There is a $35 discount if you register and pay in-full before Feb. 15, 2018.'
      },
      {
        question: 'Can I bring a family member that will not be participating?',
        answer: 'Yes, non-participants and chaperones can attend. Please see registration for food and lodging costs for non-participants. We encourage non-participants that wish to jam during off hours to sign up for camp instead if they would like to participate. We want to minimize distractions to be respectful to bands that are rehearsing at night.'
      },
      {
        question: 'Are friends and family allowed at camp sessions?',
        answer: 'Kids under 16 should be chaperoned but in general we want to minimize distractions, and space may be an issue.'
      },
      {
        question: 'I am under 18. Can I attend the camp? What is the minimum age for campers? ',
        answer: 'There is no minimum age, but minors under 16 must be accompanied by a chaperone. All attendees 18 and under must have the “Minor Release Form” filled out by their parent/guardian prior to attending the camp. This form can be found on the registration page.'
      },
      {
        question: 'What is the cancellation policy?',
        answer: 'The cancellation policy will be fairly strict, as we will be planning the groupings long before the camp begins. Refunds of the balance paid, minus $75 is refundable up to 2 weeks prior to camp. If cancellation is in the 2 weeks prior to camp, your balance (minus $75) will be credited toward the next BandCamp, and is only available for a BandCamp within the next year. If cancellation is in the 3 days prior to camp, no refunds will be given for any reason. Registrations are transferable to friends and family members only after discussing it with the BandCamp office. '
      },
      {
        question: 'What is the deadline for signing up? ',
        answer: 'There will be a $35 discount for signing up before Feb 15, 2018 for our spring BandCamp, and July 1, 2018 for our fall BandCamp.'
      },
      {
        question: 'What kind of instructors are at BandCamp?',
        answer: 'All the instructors for BandCamp will be professional musicians and teachers and there will be various panelists from the industry who are highly experienced in the music business.'
      },
      {
        question: 'What topics are covered at the camp?',
        answer: 'The main goal of BandCamp is to help people move from jamming or just playing on their own towards playing in an organized group. The goal of most organized groups is to work towards “playing out”, playing in front of people either for free or for money. To do this people eventually learn by hands on experience about things like organizing material, arrangements, finding people to play with, finding gigs or places to play for experience, pictures, press kits, bios, how to set up and play over a pa system, stage presence, MC work, getting along with people, how to quit or move someone gracefully out of the group, writing songs or finding original songs for the group, singing and harmonies, instrumental organization of songs, travel, keeping your instruments healthy, keeping yourself happy and healthy.'
      },
      {
        question: 'What will a typical day look like?',
        answer: 'BandCamp will be divided into classroom instruction and band practic. Each band works on the organization and arrangements of two songs with their coach everyday. In the evenings, we encourage the groups to work on their songs and arrangements but there will likely be some jamming and such. Thursday morning there will be a concert and each band will perform their two songs'
      },
      {
        question: 'What time do camp sessions begin on the first day?',
        answer: 'You can arrive Sunday at Camp Harrison anytime after 5pm and we will begin doing some playing and organizing of the groupings. We will be starting Sunday evening doing playing and jamming so that our instructors can start deciding how to group the participants each into a band of four to six people, so Sunday arrival would be best, as we’ll start fairly early Monday.'
      },
      {
        question: 'What time do camp activities end on the last day?',
        answer: 'Checkout is 11am Thursday and we will have a brunch concert that morning so that each band can perform their two songs in front of the entire camp!'
      },
      {
        question: 'What music genres are welcome at camp? Is camp for acoustic and electric musicians?',
        answer: ' Genres are not limited, but the camp is based around acoustic musicians due to issues with space and noise. Electric bass is ok, but we aren’t really planning on electric bands at this point, but the concepts all apply to pretty much all genres.'
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
        answer: 'No linens are not provided, you must bring your own'
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
        answer: 'No they are not cleaned daily, they are cleaned before you arrive at camp.'
      },
      {
        question: 'Are RV hookups available?',
        answer: 'No traditional RV Hookups are not available. There are low amperage electrical outlets to hook up your RV. No water or sewage is available at your site.'
      },
      {
        question: 'If I am staying in an RV or tent, can I use the camp\'s showers?',
        answer: 'Yes you can use the camp showers'
      },
      {
        question: 'Do you provide RVs and Tents?',
        answer: 'No, payment is for staying in an RV or tent space. Campers must bring their own RVs or tents.'
      },
      {
        question: 'I am sharing an RV or Tent with another person. Do I also need to pay for a separate RV or Tent package?',
        answer: 'Yes. Each person staying at camp must pay for a separate tent or RV package, even if you will be sharing a tent or RV. '
      },
      {
        question: 'Can I stay off-campus?',
        answer: 'Yes you can off campus but there will be many opportunities to jam after classes are over and the nearest hotels are about 30 minutes away. A large part of the camp is about their band learning to play together, and each person will play an important in their group.'
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
  }
});
