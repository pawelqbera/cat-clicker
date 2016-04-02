(function() {
	'use strict'
	/** 
	 * Cat Counter: version 0.2 - MVC, Object Literal, Multiple cats
	 */

	/**
	 *	Stands for M, it's simply our Model
	 */
	var data = {

		// CatsData
		cats: [{
			name: 'Ruled',
			imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Large_Siamese_cat_tosses_a_mouse.jpg',
			clickCount: 0
		}, {
			name: 'Bunny',
			imgSrc: 'http://cdn2.business2community.com/wp-content/uploads/2014/10/Cat-Dressed-as-a-Bunny-For-Halloween.jpg.jpg',
			clickCount: 0
		}, {
			name: 'Madcat',
			imgSrc: 'http://www.blogcdn.com/www.pawnation.com/media/2012/05/mad-cat.jpg',
			clickCount: 0
		}, {
			name: 'Rudy',
			imgSrc: 'http://images.thesurge.com/app/uploads/2015/12/cat-.jpg',
			clickCount: 0
		}, {
			name: 'Eyeeecat',
			imgSrc: 'http://www.iflscience.com/sites/www.iflscience.com/files/blog/%5Bnid%5D/shutterstock_265075847.jpg',
			clickCount: 0
		}, {
			name: 'Lecter',
			imgSrc: 'https://i.ytimg.com/vi/eVo3LbVWjWc/maxresdefault.jpg',
			clickCount: 0
		}],
		// Current cat index
		currentCat: null

	};

	/** 
	 *	Controller
	 */
	var controller = {
		getCats: function() {
			return data.cats;
		},
		getCat: function(catNumber) {
			return data.cats[catNumber];
		},
		getCurrentCat: function() {
			return data.cats[data.currentCat];
		},
		updateCount: function(catNumber) {
			catNumber.clickCount++;
			adminAreaView.render();
		},
		updateCatData: function(updatedCat) {
			data.cats[data.currentCat] = updatedCat;
			catListView.render();
			catView.render();
		},
		setCurrentCat: function(catNumber) {
			data.currentCat = parseInt(catNumber);
			catView.render(catNumber);
			adminAreaView.render();
		},
		init: function() {
			this.setCurrentCat(0);
			
			catListView.init();
			catView.init();
			adminAreaView.init();
		}		
	};

	/** 
	 *	Admin Area view 	
	 */
	var adminAreaView = {	
		//DOM references
		adminAreaBtn: document.getElementById('adminAreaBtn'),
		adminFormWrapper: document.getElementById('adminFormWrapper'),
		catName: document.getElementById('catName'),
		catUrl: document.getElementById('catUrl'),
		catClicksCount: document.getElementById('catClicksCount'),
		catAdminCancelBtn: document.getElementById('catAdminCancelBtn'),
		catAdminSaveBtn: document.getElementById('catAdminSaveBtn'),
		
		init: function() {
			this.adminAreaBtn.addEventListener('click', this.toggleAdminArea.bind(this));
			this.catAdminCancelBtn.addEventListener('click', this.hideAdminArea.bind(this));
			this.catAdminSaveBtn.addEventListener('click', this.updateCat.bind(this));
			this.render();
		},
		
		render: function() {
			var currentCat = controller.getCurrentCat();
			this.catName.value = currentCat.name;
			this.catUrl.value = currentCat.imgSrc;
			this.catClicksCount.value = currentCat.clickCount;			
		},
		toggleAdminArea: function() {
				if(this.adminFormWrapper.style.display === 'none') {
					this.showAdminArea();
				} else {
					this.hideAdminArea();
				}
		},
		showAdminArea: function() {
			this.adminFormWrapper.style.display = 'block';
		},
		hideAdminArea: function() {
			this.adminFormWrapper.style.display = 'none';
		},
		updateCat: function() {
			var updatedCat = {
				name: this.catName.value,
				imgSrc: this.catUrl.value,
				clickCount: this.catClicksCount.value	
			}
			controller.updateCatData(updatedCat);
			this.hideAdminArea();
		}
	};
	/** 
	 *	Cat list view 	
	 */
	var catListView = {
		//DOM variables
		catList: document.getElementById('catList'),

		render: function() {
			var output = [],
				i = 0,
				cats = controller.getCats(),
				l = cats.length;

			this.catList.innerHTML = '';

			var elem = document.createElement('ul');

			for (; i < l; i++) {
				var cat = controller.getCat(i);

				var item = document.createElement('li');
				item.className = 'cat-item';
				var label = document.createTextNode(cat.name);
				item.appendChild(label);

				item.addEventListener('click', (function(i) {
					return function() {
						controller.setCurrentCat(i);
					};
				})(i));

				elem.appendChild(item);
			}

			this.catList.appendChild(elem);
			output = [];
		},
		init: function() {
			this.render();
		}
	}

	/** 
	 *	Cat details view 	
	 */
	var catView = {
		//DOM variables
		catWrapper: document.getElementById('catWrapper'),

		render: function() {
			var output = [];
			
			var cat = controller.getCurrentCat();
			
			catWrapper.innerHTML = '';

			output.push('<img class="cat-photo" src=' + cat.imgSrc + ' alt=' + cat.name + ' />');
			output.push('<div class="counter-wrapper"><span>' + cat.clickCount + '</span></div>');
			output.join('');

			var elem = document.createElement('div');
			elem.innerHTML = output;

			var _this = this;
			elem.addEventListener('click', (function(copyCat) {
				return function() {
					controller.updateCount(copyCat);
					_this.render(copyCat);
				};
			})(cat));

			catWrapper.appendChild(elem);
			output = [];
		},
		init: function() {
			this.render();
		}
	}

	controller.init();

})();