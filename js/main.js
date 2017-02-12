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

        $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            data: {
                client_id: '08a1741942752154caef',
                client_secret: '133cb1601f1a0abba4afdcdf9e2cd284667dc6a1',
                sort: 'created: asc',
                //per_page: 5
            }

        }).done(function(repos) {
          $.each(repos, function (index, repo) {
              $('#repos').append(`
                 <div class="well">
                    <div class="row">
                        <div class="col-md-5">
                            <strong>${repo.name}: ${repo.description}</strong>
                        </div>
                        <div class="col-md-5">
                            <span class="label label-warning">Forks: ${repo.forks_count}</span>
                            <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                            <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-default">Go Repository</a>
                        </div>
                    </div> 
                 </div> 
              `);
          })
        });

      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
                <div class="col-md-3">
                  <img src="${user.avatar_url}" class="avatar thumbnail" alt="Avatar User GitHub" />
                  <a class="btn btn-default btn-block" target="_blank" href="${user.html_url}">Go Profile</a>  
                </div>
                <div class="col-md-9">
                  <div class="label-block">
                    <span class="label label-default">Public Repos: ${user.public_repos}</span>
                    <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                    <span class="label label-success">Followers: ${user.followers}</span>
                    <span class="label label-warning">Following: ${user.following}</span>
                  </div>
                  
                  <ul class="list-group">
                    <li class="list-group-item"><strong>Company: </strong> <em>${user.company}</em></li>
                    <li class="list-group-item"><strong>Website/Blog: </strong><em class="info-li">${user.blog}</em></li>
                    <li class="list-group-item"><strong>Location: </strong><em class="info-li">${user.location}</em></li>
                    <li class="list-group-item"><strong>Member Since: </strong> <em class="info-li">${user.created_at}</em></li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
        
        <h3 class="page-header">Latest Repository</h3>
        <div id="repos"></div>
        `);
    });
  });
});
