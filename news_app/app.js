// START //
$(() => {

// JQUERY - MAIN SITE //
const $topNews = $('.top-news')

// JQUERY - MODAL //
const $headlineModal = $('#headline-modal')
  const $headlineContatiner = $('.headline-container')
    const $previous = $('#previous-btn')
    const $headlineImgs = $('.headline-imgs')
      const $headline = $('.headline')
        const $headlineText = $('.headline-text')
        const $headlineUrl = $('.headline-url')
      const $headlineDes = $('.headline-description')
    const $next = $('#next-btn')
    const $close =  $('#close')

// JS //
let titleArray = [];
let urlToImageArray = [];
let descriptionArray = [];
let urlToArticleArray = [];

let currentHeadline = 0; // parameters for carousel
const lastHeadline = 4; // parameters for carousel

let category = ''; // search for category depending on button clicked
let click = 0;



// ON PAGE LOAD //

$headlineModal.hide() // hide modal until button is clicked

// THEN WHENEVER YOU CLICK A MAIN SITE BUTTON //
  // depending on the button you click it will change the category searched for in the API
$("button[name='home-button']").on('click', (event) => { // START OF FIRST CLICK FUNCTION
  if ($(event.currentTarget).hasClass('top-news')) {
    // console.log('general');
    category = 'general'
  } else if ($(event.currentTarget).hasClass('business')) {
    // console.log('Business');
    category = 'business'
  }  else if ($(event.currentTarget).hasClass('entertainment')) {
    // console.log('Entertainment');
    category = 'entertainment'
  } else if ($(event.currentTarget).hasClass('health')) {
    // console.log('Health');
    category = 'health'
  } else if ($(event.currentTarget).hasClass('science')) {
    // console.log('Science');
    category = 'science'
  } else if ($(event.currentTarget).hasClass('sports')) {
    // console.log('Sports');
    category = 'sports'
  } else if ($(event.currentTarget).hasClass('technology')) {
    // console.log('Tech');
    category = 'technology'
  }

  // ONCE BUTTON IS CLICKED //
  const promise = $.ajax({ // AJAX
    url: 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&category=' + category + '&pageSize=5&apiKey=850ce7d10a3c44d6b8a3e6ac81eb0cb9'
  }).then( // START OF THEN //
  (data) => {
    // AND THE PAGE LOADS...
    $headlineText.empty() // empty $headlineText
    $headlineDes.empty() // empty $headlineDes

    for (let i = 0; i < data.articles.length; i++) { // run this for loop that loops through the data and pushes items into arrays
      titleArray.push(data.articles[i].title) // push data titles to titleArray
      if (data.articles[i].urlToImage == null) {
        urlToImageArray.push('imgs/broken.png') // default picture incase the article doesnt have one
      } else {
        urlToImageArray.push(data.articles[i].urlToImage) // push data urls to urlToImageArray
      }
      if (data.articles[i].description == null) {
        descriptionArray.push(`Sorry, there is no description for this article. Please click 'Read More' to view the entire article`) // default text for when an article doesnt have a description
      } else {
        descriptionArray.push(data.articles[i].description) // push data description to descriptionArray
      }
      urlToArticleArray.push(data.articles[i].url)
    }
    // then take elements from array and append them to the modal
    $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')') // set the headline img background to the first articles url
    $headlineImgs.css('background-position', 'center') // center the image
    $headlineImgs.css('background-size', 'cover') // set it as a cover
    $headlineImgs.css('background-repeat', 'no-repeat') // dont repeat
    $headlineText.append(titleArray[currentHeadline]) // append first articles title to headline

    $headlineDes.append(descriptionArray[currentHeadline]) // append first articles description to headlines
    $headline.append(`<a href='${urlToArticleArray[currentHeadline]}>Read More</a>`) // add current article url to read more link on headline div
    $headlineText.show() // show the headline text
    $headlineDes.hide() // hide the description
    // then show the modal
    $headlineModal.show()
  }, // END OF DATA - START OF ERROR //
  (error) => {
    console.log('error');
  }) // END OF THEN AND ERROR //
}) // END OF FIRST CLICK FUNCTION //

    // WHEN NEXT BUTTON IS CLICKED //
    $next.on('click', () => { // when you click the NEXT button
      if (currentHeadline < lastHeadline) {
        currentHeadline++ // add to currentHeadline
        $headlineText.empty() // empty $headlineText
        $headlineDes.empty() // empty $headlineDes
        $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')') // add current article img url
        $headlineImgs.css('background-position', 'center') // center the image
        $headlineImgs.css('background-size', 'cover') // set it as a cover
        $headlineImgs.css('background-repeat', 'no-repeat') // dont repeat
        $headlineText.append(titleArray[currentHeadline]) //  add current article title
        $headlineDes.append(descriptionArray[currentHeadline]) // add current article description
      } else { // otherwise reset the current headline and start slideshow over
        currentHeadline = 0;
        $headlineText.empty()
        $headlineDes.empty()
        $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')')
        $headlineImgs.css('background-position', 'center') // center the image
        $headlineImgs.css('background-size', 'cover') // set it as a cover
        $headlineImgs.css('background-repeat', 'no-repeat') // dont repeat
        $headlineText.append(titleArray[currentHeadline])
        $headlineDes.append(descriptionArray[currentHeadline])
      }
    }) // END OF NEXT BUTTON FUNCTION

    // WHEN PREVIOUS BUTTON IS CLICKED //
    $previous.on('click', () => { // when you click the PREVIOUS button...
      if (currentHeadline > 0) {
        currentHeadline-- // take away from currentHeadline
        $headlineText.empty() // empty $headlineText
        $headlineDes.empty() // empty $headlineDes
        $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')') // add current article img
        $headlineImgs.css('background-position', 'center') // center the image
        $headlineImgs.css('background-size', 'cover') // set it as a cover
        $headlineImgs.css('background-repeat', 'no-repeat') // dont repeat
        $headlineText.append(titleArray[currentHeadline]) //  add current article title
        $headlineDes.append(descriptionArray[currentHeadline]) // add current article description
      } else { // otherwise reset the current headline and start slideshow over
        currentHeadline = lastHeadline;
        $headlineText.empty()
        $headlineDes.empty()
        $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')')
        $headlineImgs.css('background-position', 'center') // center the image
        $headlineImgs.css('background-size', 'cover') // set it as a cover
        $headlineImgs.css('background-repeat', 'no-repeat') // dont repeat
        $headlineText.append(titleArray[currentHeadline])
        $headlineDes.append(descriptionArray[currentHeadline])
      }
    }) // END OF PREVIOUS BUTTON FUNCTION

    // WHEN CLOSE BUTTON IS CLICKED //
    $close.on('click', (event) => { // when you click the CLOSE button...
      $headlineModal.hide(); // hide the whole modal
      // and empty the arrays
      titleArray = [];
      urlToImageArray = [];
      descriptionArray = [];
      urlToArticleArray = [];
    }) // END OF CLOSE BUTTON FUNCTION


    // WHEN YOU CLICK ON HEADLINE IMAGE //
    $headlineImgs.on('click', () => {
      if (click === 0 ) {
        $headline.slideToggle( () => {
          $headlineDes.slideToggle(800)
        });
        click++
      } else if (click === 1) {
        $headlineDes.slideToggle(800, () => {
          $headline.slideToggle()
        });
        click--
      }
    }) // END OF HEADLINE IMAGE BUTTON FUNCTION


    // WHEN YOU CLICK ON READ MORE LINK //
    $('a').on('click', () => {
      window.open(urlToArticleArray[currentHeadline])
    }) // END OF LINK CLICK FUNCTION //

}) // END //








  ////////////////////
 // CODE GRAVEYARD //
////////////////////

// console.log(category);
// console.log(titleArray.length);
// console.log(descriptionArray.length);

// ORIGINAL AJAX
//   const promise = $.ajax({ // takes 5 top headlines, adds their image and headline to headline-container
//     url: 'https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=850ce7d10a3c44d6b8a3e6ac81eb0cb9'
//         // getting live and top breaking news headlines from US
//   }).then( // START OF THEN //
//   (data) => {
//       $headlineImgs.css('background','url(' + data.articles[currentHeadline].urlToImage + ')')
//       $headlineText.append(data.articles[currentHeadline].title)
//   }, // END OF DATA //
//   (error) => {
//     console.log('error');
//   } // END OF ERROR //
// ) // END OF THEN AND AJAX //



// figuring out how to access data
  // $('<div>' + data.articles[0].author + '<div>').appendTo('body')
  // $('<div>' + data.articles[0].title + '<div>').appendTo('body')
  // $('<div>' + data.articles[0].content + '<div>').appendTo('body')

// setting up first button
  // $("button[type='button']").on('click', (event) => {
  //   // console.log('hi');
  //     $headlineModal.show()
  //   if ($(event.currentTarget).hasClass('top-news')) {
  //     // topNews = 'top-headlines'
  //     // console.log(titleArray[currentHeadline]);
  //     // console.log(descriptionArray[currentHeadline]);
  //   }
  // })

  // when you hit TOP NEWS button this will run
  // $topNews.on('click', () => {
  //   $headlineModal.show()
  //   // $headlineModal.toggle()
  // })

// first click function
  // $("button[type='button']").on('click', (event) => {
  //   if ($(event.currentTarget).hasClass('top-news')) {
  //     console.log('General');
  //   } else if ($(event.currentTarget).hasClass('business')) {
  //     console.log('Business');
  //   }  else if ($(event.currentTarget).hasClass('entertainment')) {
  //     console.log('Entertainment');
  //   } else if ($(event.currentTarget).hasClass('health')) {
  //     console.log('Health');
  //   } else if ($(event.currentTarget).hasClass('science')) {
  //     console.log('Science');
  //   } else if ($(event.currentTarget).hasClass('sports')) {
  //     console.log('Sports');
  //   } else if ($(event.currentTarget).hasClass('technology')) {
  //     console.log('Tech');
  //   }
  //   // $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')') // append first articles url to image and set it as background
  //   // $headlineText.append(titleArray[currentHeadline]) // append first articles title to headline
  //   // $headlineDes.append(descriptionArray[currentHeadline]) // append first articles description to headlines
  //   // $headlineDes.hide() // hide the description
  //   // $headlineModal.show() // show the whole modal
  //
  // }) // END OF FIRST CLICK FUNCTION
  // STILL ON LOAD
  // $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')') // append first articles url to image and set it as background
  // $headlineText.append(titleArray[currentHeadline]) // append first articles title to headline
  // $headlineDes.append(descriptionArray[currentHeadline]) // append first articles description to headlines
  // $headlineDes.hide() // hide the description
  // console.log(category);
  // console.log(titleArray.length);
  // console.log(descriptionArray.length);


  // // MODAL that takes 5 top headlines, adds their image and headline to headline-container
  // $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')') // append first articles url to image and set it as background
  // $headlineText.append(titleArray[currentHeadline]) // append first articles title to headline
  // $headlineDes.append(descriptionArray[currentHeadline]) // append first articles description to headlines
  // $headlineDes.hide() // hide the description

  // older close funtion set up
  // $headlineContatiner.trigger('reset');
  // $headline.show();
  // $headlineDes.show();
  // $headlineImgs.empty()

  // older $headlineImgs click function
  // if ($headlineDes.hasClass('headline-description')) {
  //   $headlineDes.toggle(); // toggle the description
  //   $headlineText.toggle(); // toggle the headline text
  //   $headline.toggle(); // toggel the headline div
  // }

  // Trying to fix null problem
  // if (urlToImageArray[currentHeadline] == 'null') {
  //   console.log('error');
  //   data.articles[i].urlToImage = 'null'
  //   console.log(data.articles[i].urlToImage);
  //   $headlineImgs.css('background','url(imgs/broken.png)')
  //   console.log('check');
  // }


  // // OG SHOW MODAL
  // $headlineModal.show()
  // }) // OG END OF FIRST CLICK FUNCTION

  // OG CLICK ON HEADLINE IMAGE //
  // $headlineImgs.on('click', () => {
  //   $headline.slideToggle(); // toggle the description on
  //   $headlineDes.delay(1000).slideToggle()
  // }) // END OF HEADLINE IMAGE BUTTON FUNCTION
