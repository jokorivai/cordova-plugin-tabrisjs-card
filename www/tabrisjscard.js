function _textWidth(t){return 8*(t||'').length;}
function ActionButton(_opts/*{text:'', image:'', background:'', textColor: ''}*/){
	var _abo = {
		elevation: 0,
		width: 32, top: 3, bottom:3,
		highlightOnTouch: true,
		cornerRadius:2
	};	
	_abo.background = _opts.background||'#ffffff';	
	_abo.textColor  = _opts.textColor||'#333333';	
	var _w;
	var _ab = new tabris.Composite(_abo);
	
	_opts.image = _opts.image || '';
	if (_opts.image!='') {
		_w = _abo.width;
		_ab.image = new tabris.ImageView({
			left:2, top: 2, bottom:2, width:32,
			background: _abo.background,
			image: {src:_opts.image, width:24, height:24},
			tintColor: _abo.textColor
		}).appendTo(_ab);
	}
	else
	{
		_w = 0;
		_ab.image = new tabris.ImageView({
			left:0, top: 0, bottom:0, width:0,
			background: _abo.background
		}).appendTo(_ab);	
	}
	
	_abo.text = _opts.text||'';
	if (_abo.text!=''){
		_w+= (2+_textWidth(_abo.text));
		_ab.set('width', _w);
		new tabris.TextView({
			left: [_ab.image,1] , top: 0, bottom:0, width:_textWidth(_abo.text),
			text: _abo.text.substr(0,10),
			textColor: _abo.textColor
		}).appendTo(_ab);		
	}
	else
	{
		new tabris.TextView({
			left: [_ab.image, 0] , top: 0, bottom:0, width:0,
			text: ''
		}).appendTo(_ab);		
	}
	_ab.on('touchstart', function(iv){
		iv.animate({transform: {translationZ: 3}}, {duration: 200, easing: "ease-out"});
	})
	.on('touchend', function(iv){
		iv.animate({transform: {translationZ: 0}}, {duration: 200, easing: "ease-out"});
	});
	return _ab;
}

module.exports = {
	createCard: function(message, cardTitle, options){
		var opts = {};
		opts.cornerRadius = options.cornerRadius || 2;
		opts.elevation = options.elevation || 3;
		opts.background = options.background || '#ffffff';
		opts.layoutData = {};
		opts.layoutData.left = options.left || 6;
		opts.layoutData.right = options.right || 6;		
		opts.image = options.image || '';
		opts.imagePosition = options.imagePosition || 'left';
		opts.imageCaptionColor = options.imageCaptionColor || '#ddbb00';
		if (options.imagePosition=='top'){
			opts.layoutData.height = options.height || 300;
		}
		else
		{
			opts.layoutData.height = options.height || 200;	
		}
		opts.imageCaption = options.imageCaption || '';
		var _title = cardTitle || '';
		if (options.adjacentTop) {
			opts.layoutData.top = [options.adjacentTop, options.top || 6];
		}
		else
		{
			opts.layoutData.top = options.top || 6;
		}
		opts.actions = options.actions || [];
		var _bottom = 0;
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
			/*_bottom = 51;
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
				actOpts.background = '#ffffff';
				actOpts.elevation = 0;				
				actOpts.tintColor = '#ffff00';
				actOpts.textColor = '#c78300';
				lAct = new tabris.Button(actOpts).on('select', function(_btn){
					if (typeof _btn.action=='function') {
						_btn.action(
							a, //TheCard 
							_btn //TheButton
						);
					}
				}).appendTo(bar);
				lAct.action = opts.actions[i].action;
				a.actions.push(lAct);*/

				var bar = new tabris.Composite({
					class: 'cardActionBar',
					layoutData: {left:3, bottom:3, right: 3, height: 44}
				}).appendTo(a);
				a.actionBar = bar;
				var lAct;
				for (var i=0; i<opts.actions.length; i++) {
					var actOpts = {
						position: opts.actions[i].position || 'right'
					};
					if ((opts.actions[i].image || '')!=''){
						actOpts.image = opts.actions[i].image;
					}
					if ((opts.actions[i].text || '')!=''){
						actOpts.text = opts.actions[i].text;
					}			
					var _r, _l;
					if (lAct && (lAct!=null)) {
						if (lAct.position == 'left')
						{
							_l = [lAct,3];
						}
						else
						{
							_r = [lAct,3];
						}
					}
					else
					{
						_r = 0;
					}		
					actOpts.background = '#ffffff';					
					actOpts.textColor = opts.actions[i].color || '#c78300';
					lAct = ActionButton(actOpts).on('tap', function(_btn){
						if (typeof _btn.action=='function') {
							_btn.action(
								a, //TheCard 
								_btn //TheActionButton
							);
						}
					}).appendTo(bar);
					lAct.position = actOpts.position;
					if (actOpts.position=='left'){
						lAct.set('left', _l);	
					}
					else
					{
						lAct.set('right', _r);
					}
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
			a.title = title;
			a.content = new tabris.TextView({
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
					layoutData: {top: 0, left: 0, right:0 , height: Math.floor(opts.layoutData.height/2)},
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
				if (opts.imageCaption!=''){
					a.imageCaption = new tabris.TextView({
						class: 'cardimageCaption',
						layoutData: {bottom: image.get('height')+6, left: 3, right:3},
						text: opts.imageCaption,
						textColor: opts.imageCaptionColor,
						font: 'bold 13px'
					}).appendTo(a);
				}
			}
			else {
				var image = new tabris.ImageView({
					class: 'cardImage',
					layoutData: {top: 0, left: 0, width: Math.floor(screen.width/3), bottom: _bottom},
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
				if (opts.imageCaption!=''){
					a.imageCaption = new tabris.TextView({
						class: 'cardimageCaption',
						layoutData: {bottom: 3, left: 3, width: image.get('width')-3},
						text: opts.imageCaption,
						textColor: opts.imageCaptionColor,
						font: 'bold 13px'
					}).appendTo(a);
				}
			}
		}
		
		return a;
	}
};