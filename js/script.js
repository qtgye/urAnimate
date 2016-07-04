(function (_w,_d) {
	
var app = _w.App = {};


var $test 	= $('#test'),
	$run 	= $test.find('.js-run'),
	$block 	= $test.find('.block'),
	$object = _d.querySelectorAll('.block-object'),
	$bar 	= $test.find('.block-bar');

$run.on('click',function () {
	[].forEach.call($object,function (el) {
		el.urAnimate({
			'margin-left' : ($block.width()*0.9)-8+'px', // calc( 90% - 8px )
			'margin-top'  : '50px'
		},[1000],[
			'sfsf',
			// elastic
			function (t,b,c,d) {
				var ts=(t/=d)*t;
				var tc=ts*t;
				return b+c*(56*tc*ts + -175*ts*ts + 200*tc + -100*ts + 20*t);
			}
		]);
	});
});


})(window,document);