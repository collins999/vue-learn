window.addEventListener('load', function() {
    sessionStorage.setItem('good_exit', 'pending');
    setInterval(function() {
        sessionStorage.setItem('time_before_crash', new Date().toString());
    }, 1000);
});

window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('good_exit', 'true');
});

if (sessionStorage.getItem('good_exit') &&
    sessionStorage.getItem('good_exit') !== 'true') {
    /*
       insert crash logging code here
   */
    alert('Hey, welcome back from your crash, looks like you crashed on: ' + sessionStorage.getItem('time_before_crash'));
}