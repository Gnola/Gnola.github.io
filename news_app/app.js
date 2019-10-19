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
let dataArray = []
let currentHeadline = 0;
const lastHeadline = 4;


//when you hit a certain button this will run
  const promise = $.ajax({ // takes 5 top headlines, adds their image and headline to headline-container
    url: 'https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=850ce7d10a3c44d6b8a3e6ac81eb0cb9'
        // getting live and top breaking news headlines from US
  }).then( // START OF THEN //
  (data) => {
      $headlineImgs.css('background','url(' + data.articles[currentHeadline].urlToImage + ')')
      $headlineText.append(data.articles[currentHeadline].title)
  }, // END OF DATA //
  (error) => {
    console.log('error');
  } // END OF ERROR //
) // END OF THEN AND AJAX //

// const next = (data) => {
//   if (currentHeadline < lastHeadline) {
//     console.log(currentHeadline);
//     currentHeadline++
//   } else {
//     currentHeadline = 0;
//   }
// }
//   $next.on('click', next)

//   const promise = $.ajax({
//     url: 'https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=850ce7d10a3c44d6b8a3e6ac81eb0cb9'
//   }).then( // START OF THEN //
//   (data) => {
//     for (let i = 0; i < data.articles.length; i++) {
//       console.log(data.articles[i].title); // gives me all 5 titles of the articles
//     }
//   },
//   (error) => {
//     console.log('error');
//   }
// )











}) // END //










// figuring out how to access data
  // $('<div>' + data.articles[0].author + '<div>').appendTo('body')
  // $('<div>' + data.articles[0].title + '<div>').appendTo('body')
  // $('<div>' + data.articles[0].content + '<div>').appendTo('body')
