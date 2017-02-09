$(document).ready(function ($) {
  $('#searchUser').on('keyup', function (e) {
    let username = e.target.value;

    //Make request to GitHub
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '08a1741942752154caef',
        client_secret: '133cb1601f1a0abba4afdcdf9e2cd284667dc6a1'
      }
    }).done(function (user) {
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
          
          </div>
        </div>
        `);
    });
  });
});
