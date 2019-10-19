$(() => {

// VARIABLES //
  // jquery
const $modal = $('#modal')
  const $headlineContatiner = $('.headline-container')
    const $previous = $('#previous-btn')
    const $headlineImgs = $('.headline-imgs')
    const $headlineText = $('.headline-text')
  const $next = $('#next-btn')
  const $close =  $('#close')




  // js
let titleArray = [];
let urlToImageArray = [];
let currentHeadline = 0;
const lastHeadline = 4;


//when you hit a certain button this will run
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

// const next = (data) => {
//   if (currentHeadline < lastHeadline) {
//     console.log(currentHeadline);
//     currentHeadline++
//   } else {
//     currentHeadline = 0;
//   }
// }
//   $next.on('click', next)

  const promise = $.ajax({
    url: 'https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=850ce7d10a3c44d6b8a3e6ac81eb0cb9'
  }).then( // START OF THEN //
  (data) => { // when page loads...
    for (let i = 0; i < data.articles.length; i++) { // loop through data
      // console.log(data.articles[i].title); // gives me all 5 titles of the articles
      titleArray.push(data.articles[i].title) // push data titles to titleArray
      urlToImageArray.push(data.articles[i].urlToImage) // push data urls to urlToImageArray
    } // then...
      $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')') // append first articles url to image and set it as background
      $headlineText.append(titleArray[currentHeadline]) // append first articles title to headline
    // console.log(titleArray);
    // console.log(titleArray[currentHeadline]);
    // console.log(urlToImageArray);
    // console.log(urlToImageArray[currentHeadline]);
    $next.on('click', () => { // when you click the NEXT button
      if (currentHeadline < lastHeadline) {
        currentHeadline++ // add to currentHeadline
        $headlineText.empty() // empty $headlineText
        $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')') // add current article img
        $headlineText.append(titleArray[currentHeadline]) //  add current article title
      } else { // otherwise reset the current headline and start slideshow over
        currentHeadline = 0;
        $headlineText.empty()
        $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')')
        $headlineText.append(titleArray[currentHeadline])
      }
    }) // END OF NEXT BUTTON FUNCTION
    $previous.on('click', () => { // when you click the PREVIOUS button...
      if (currentHeadline > 0) {
        currentHeadline-- // add to currentHeadline
        $headlineText.empty() // empty $headlineText
        $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')') // add current article img
        $headlineText.append(titleArray[currentHeadline]) //  add current article title
      } else { // otherwise reset the current headline and start slideshow over
        currentHeadline = lastHeadline;
        $headlineText.empty()
        $headlineImgs.css('background','url(' + urlToImageArray[currentHeadline] + ')')
        $headlineText.append(titleArray[currentHeadline])
      }
    }) // END OF NEXT BUTTON FUNCTION
  }, // END OF DATA
  (error) => {
    console.log('error');
  }
)











}) // END //










// figuring out how to access data
  // $('<div>' + data.articles[0].author + '<div>').appendTo('body')
  // $('<div>' + data.articles[0].title + '<div>').appendTo('body')
  // $('<div>' + data.articles[0].content + '<div>').appendTo('body')
