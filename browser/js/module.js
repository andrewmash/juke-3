'use strict';

var juke = angular.module('juke', ['ui.router']);

juke.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/albums');
	// $urlRouterProvider.when('/artist/:id', '/artist/:id/albums');
    // define a something state
    $stateProvider.state('albumList', {
        // that renders the following 
        templateUrl: '/js/album/albums.html',
        // for the /albums route
        url: '/albums',
        resolve: {
        	albums: function(AlbumFactory) {
    			return AlbumFactory.fetchAll();
    		}
        },
        controller: 'AlbumsCtrl'
    });
    $stateProvider.state('artistList', {
    	templateUrl: '/js/artist/artists.html',
    	url: '/artists',
    	resolve: {
    		artists: function(ArtistFactory) {
    			return ArtistFactory.fetchAll();
    		}
    	},
    	controller: 'ArtistsCtrl'
    });
    $stateProvider.state('albumView', {
    	templateUrl: '/js/album/album.html',
    	url: '/album/:id',
    	resolve: {
    		album: function(AlbumFactory, $stateParams) {
    			return AlbumFactory.fetchById($stateParams.id);
    		}
    	},
    	controller: 'AlbumCtrl'
    });
    $stateProvider.state('artistView', {
    	// abstract: true,
    	templateUrl: '/js/artist/artist.html',
    	url: '/artist/:id',
    	resolve: {
    		artist: function(ArtistFactory, $stateParams) {
    			return ArtistFactory.fetchById($stateParams.id);
    		}
    	},
    	controller: 'ArtistCtrl'
    })
    .state('artistView.albums', {
    	templateUrl: '/js/artist/artist-albums.html',
    	url: '/artist/:id/albums'
    })
    .state('artistView.songs', {
    	templateUrl: '/js/artist/artist-songs.html',
    	url: '/artist/:id/songs'
    });
});