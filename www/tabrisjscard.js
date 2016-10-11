module.exports = {
	createCard: function(message, cardTitle, options){
		var opts = {};
		opts.cornerRadius = options.cornerRadius || 3;
		opts.elevation = options.elevation || 3;
		opts.background = options.background || '#ffffff';
		opts.layoutData = {};
		opts.layoutData.left = options.left || 6;
		opts.layoutData.right = options.right || 6;
		opts.layoutData.height = options.height || 200;
		opts.image = options.image || '';
		opts.imagePosition = options.imagePosition || 'left';
		var _title = cardTitle || '';
		if (options.adjacentTop) {
			opts.layoutData.top = [options.adjacentTop, options.top || 6];
		}
		else
		{
			opts.layoutData.top = options.top || 6;
		}
		opts.actions = options.actions || [];
		var _bottom = 3;
		var a =  new tabris.Composite({
			cornerRadius: opts.cornerRadius,
			elevation: opts.elevation,
			background: opts.background,
			layoutData: {
				left: opts.layoutData.left, 
				right: opts.layoutData.right, 
				top: opts.layoutData.top, 
				height: opts.layoutData.height
			}
		});
		a.actions = [];
		if (opts.actions.length>0) {
			_bottom = 51;
			var bar = new tabris.Composite({
				class: 'cardActionBar',
				layoutData: {left:0, bottom:0, right: 0, height: _bottom-3}
			}).appendTo(a);
			a.actionBar = bar;
			var lAct;
			//for (var i=opts.actions.length-1; i>=0; i--) {
			for (var i=0; i<opts.actions.length; i++) {
				var actOpts = {};
				var bw = 0;
				if ((opts.actions[i].image || '')!=''){
					actOpts.image = opts.actions[i].image;
					bw += (_bottom+6);
				}
				if ((opts.actions[i].text || '')!=''){
					actOpts.text = opts.actions[i].text.substr(0, 8);
					bw+= 64;
				}
				if (lAct && (lAct!=null)) {
					actOpts.layoutData = {right: [lAct,3], bottom:3, top: 3 ,width: bw};
				}
				else
				{
					actOpts.layoutData = {right: 3, bottom:3, top: 3, width: bw};
				}
				actOpts.background = '#c78300';
				actOpts.elevation = 0;				
				actOpts.tintColor = '#ffff00';
				actOpts.textColor = '#fafafa';
				lAct = new tabris.Button(actOpts).on('select', function(_btn){
					if (typeof _btn.action=='function') {
						_btn.action(/*TheCard*/a, /*TheButton*/_btn);
					}
				}).appendTo(bar);
				lAct.action = opts.actions[i].action;
				a.actions.push(lAct);
			}
		}
		if (opts.image == '') {
			var title = new tabris.TextView({
				class: 'cardTitle',
				layoutData: {top:(_title==''?0:3), left: 3, right:3, height: (_title==''?0:20)},
				text: _title,
				font: 'bold 14px',
				textColor: '#000055'
			}).appendTo(a);
			new tabris.TextView({
				class: 'cardText',
				layoutData: {top: [title, 3], left: 3, right:3/*, bottom: _bottom*/},
				text: message,
				textColor: '#444444'
			}).appendTo(a);	
		}
		else
		{			
			if (opts.imagePosition=='top'){
				var image = new tabris.ImageView({
					class: 'cardImage',
					layoutData: {top: 3, left: 3, right:3 , height: 100},
					image: opts.image,
					scaleMode: 'fill'
				}).appendTo(a);				
				var title = new tabris.TextView({
					class: 'cardTitle',
					layoutData: {top:[image, (_title==''?0:3)], left: 3, right:3, height: (_title==''?0:20)},
					text: _title,
					font: 'bold 14px',
					textColor: '#000055'
				}).appendTo(a);
				a.image = image;
				a.title = title;
				a.content = new tabris.TextView({
					class: 'cardText',
					layoutData: {top: [title, 3], left: 3, right:3/*, bottom: _bottom*/},
					text: message,
					textColor: '#444444'
				}).appendTo(a);
			}
			else {
				var image = new tabris.ImageView({
					class: 'cardImage',
					layoutData: {top: 3, left: 3, width: Math.floor(screen.width/3), bottom: _bottom},
					image: opts.image,
					scaleMode: 'fill'
				}).appendTo(a);
				var title = new tabris.TextView({
					class: 'cardTitle',
					layoutData: {top:(_title==''?0:3), left: [image, 6], right:3, height: (_title==''?0:20)},
					text: _title,
					font: 'bold 14px',
					textColor: '#000055'
				}).appendTo(a);
				a.image = image;
				a.title = title;
				a.content = new tabris.TextView({
					class: 'cardText',
					layoutData: {top: [title, 3], left: [image, 6], right:3/*, bottom: _bottom*/},
					text: message,
					textColor: '#444444'
				}).appendTo(a);
			}
		}
		
		return a;
	}
};