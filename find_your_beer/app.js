$(() => {

$("input[name='Yes']").on('click', () => {
  console.log('Yes');
})

$("input[name='No']").on('click', () => {
  console.log('No');
})

$("input[name='DIM']").on('click', () => {
  console.log('Does it?');
})


$.ajax({ // START OF AJAX //
  // url:'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/?key=6e1af626d8872ad4825c561bddea4ef3',
  url: 'https://sandbox-api.brewerydb.com/v2?key=e9ddb22253d8e9e9231d573c3812d957',
  method: '$jsonp',
  dataType: 'jsonp'
}).done( // END OF AJAX + START OF THEN
  (data) => { // when data run
    console.log('data');
  },
  (error) => {
    console.log('there is an error');
  }
) // END OF THEN //





}) // END //
