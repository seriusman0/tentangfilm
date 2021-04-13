function searchMovie(){
    $('#movies-list').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            //api limit 100 dalam 1 hari, request di alamat url
            'apikey':'f6ad1ffa',
            's': $('#search-input').val()
        },
        success: function(result){
            if (result.Response == "True"){
                let movies = result.Search;
 
                $.each(movies, function(i, data){
                    $('#exampleModalLabel').html("Tentang Film " +data.Title)
                    $('#movies-list').append(`
                    <div class="col-md-4">
                    <div class="card mb-3">
                        <img src="`+data.Poster+`">
                        <div class="card-body">
                        <h5 class="card-title">`+data.Title+`</h5>
                        <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                        <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`">See Details</a>
                        </div>
                  </div>
                  </div>
                    `);
                })

                $('#search-input').val('')

            }else{
                $('#movies-list').html(`
                    <h1 class="text-center">`+result.Error+`</h1>
                `)
            }
        }
    })
}

//fungsi klik tombol submit
$('#search-button').on('click', function(){
   searchMovie(); 
});

// fungsi enter
$('#search-input').on('keyup', function(e){
    if (e.keyCode === 13){
        searchMovie();
    }
});

//detail film
$('#movies-list').on('click', '.see-detail',  function(){
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey' : 'f6ad1ffa',
            'i' : $(this).data('id'),
        },
        success: function(movie){
            if(movie.Response === "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+movie.Poster+`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
                                </ul>
                                <ul class="list-group">
                                    <li class="list-group-item">Released : `+movie.Released+`</li>
                                </ul>
                                <ul class="list-group">
                                    <li class="list-group-item">Genre : `+movie.Genre+`</li>
                                </ul>
                                <ul class="list-group">
                                    <li class="list-group-item">Director : `+movie.Director+`</li>
                                </ul>
                                    <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Actors</label>
                                    <textarea class="form-control" readonly id="exampleFormControlTextarea1" rows="3">`+movie.Actors+`</textarea>
                                    </div>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    })
})