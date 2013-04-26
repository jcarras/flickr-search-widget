
var SimpleFlickrWidget = function (searchButtonId, textInputId, mainContainer, nextButtonId, previousButtonId, apiKey, numberOfResultsPerPage) {

    return {
        apiKey : null,
        numberOfResultsPerPage : 10,
        textInputId : null,
        searchButtonId : null,
        photosData : null,
        mainContainer : null,
        currentPageNum : 1,
        nextButtonId : null,
        previousButtonId : null,

        init: function () {
            var me = this;

            document.getElementById(searchButtonId).onclick=function(){
                me.searchPhotos();
            };

            document.getElementById(nextButtonId).onclick=function(){
                me.pagePhotos("next");
            };

            document.getElementById(previousButtonId).onclick=function(){
                me.pagePhotos("previous");
            };

            document.onkeydown=function(event){
                if (event.keyCode == 13) {
                    me.searchPhotos();
                };
            };

            this.apiKey                 = apiKey;
            this.numberOfResultsPerPage = numberOfResultsPerPage;
            this.textInputId            = textInputId;
            this.searchButtonId         = searchButtonId;
            this.mainContainer          = mainContainer;
        },

        searchPhotos : function(){
            var xmlhttp;
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
            }
            else
            {// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }

            var me = this;

            var jsonFlickrApi = function(data){
                me.setPhotoData(data);
            };

            var searchText = document.getElementById(this.textInputId).value;

            if(searchText !== ""){
                var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=" + this.apiKey + "&tags=" + searchText + "&safe_search=1&per_page=" + this.numberOfResultsPerPage + "&page=" + this.currentPageNum;
                xmlhttp.onreadystatechange=function()
                {
                    if (xmlhttp.readyState==4 && xmlhttp.status==200)
                    {
                        eval(xmlhttp.response);
                    }
                };

                xmlhttp.open("GET",url,true);
                xmlhttp.send();
            }
            else{
                alert("Please enter some text to search by.");
            };
        },

        pagePhotos : function(direction){
            switch(direction)
            {
                case "next":
                    this.currentPageNum++;
                    this.searchPhotos();
                    break;
                case "previous":
                    if(this.currentPageNum > 1){
                        this.currentPageNum--;
                        this.searchPhotos();
                    }
                    break;
                default:
            }
        },

        setPhotoData : function(data){
            this.photosData = data;
            if(this.photosData.photos !== undefined){
                //Clear out the container
                var mainContainer = document.getElementById(this.mainContainer);

                if(mainContainer.childNodes.length > 0){
                    mainContainer.removeChild(mainContainer.childNodes[0]);
                };

                var imgContainer = document.createElement('DIV');

                for( var i = 0; i < this.photosData.photos.photo.length; i++){
                    var item = this.photosData.photos.photo[i];
                    var src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
                    var img = document.createElement('IMG');
                    img.setAttribute('src',src);
                    imgContainer.appendChild(img);
                };

                setTimeout(function(){
                    mainContainer.appendChild(imgContainer);
                }, 1000);
            }
            else{
                alert("No photos found with the tag.");
            };
        }
    }
};
