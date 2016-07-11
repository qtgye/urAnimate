urAnimate
===
A customizable animation library.

===
### Features
- Lightweight : ~2kb file size (minified).
- Standalone : no jQuey, just pure vanilla. Works well with jQuery too.
- Flexible - Use it as a function or an HTMLElement method.
- Customizable - Use your own easing functions, individual durations, individual easings, the way you want it.

===
### Installation
> *Currently at alpha version 1.0.0-alpha.1*

- You may download the file [here][uranimateJS]
- or install it via bower: `$ bower install uranimate`

===
### Usage
UrAnimate can be used as a function or an HTMLElement/jQueryElement method.

**As a function**:`UrAnimate( element, properties, duration, easing )`
```js
var element = document.getElementById('myElement');
UrAnimate( element, { 'left' : '10px' }, 300, 'InOutCubic' );
```
**As an HTMLElement/jQueryElement method**: 
`HTMLElement.urAnimate( properties, duration, easing )`
```js
var element1 = document.getElementById('myElement1'),
    element2 = $('#myElement2');
	
element1.urAnimate( { 'left' : '10px' }, 300, 'inOutCubic' );
element2.urAnimate( { 'top' : '10px' }, 500, 'outCubic' );
```

===
### Custom Easing Functions
UrAnimate has four default easing functions: ***linear, inCubic, outCubic, inOutCubic***. It uses [Robert Penner][RobertPenner]'s easing functions for its animation (so is jQuery) . You may pass a function in the same format as the easing parameter, for example:

[RobertPenner]: <http://robertpenner.com/easing/>

```js
HTMLElement.urAnimate( { 'left':'30px' }, 500, outElasticBig );

function outElasticBig (t, b, c, d) {
    var ts=(t/=d)*t;
    var tc=ts*t;
    return b+c*(56*tc*ts + -175*ts*ts + 200*tc + -100*ts + 20*t);
}
```

===
### Individual durations and easings

You can set different duration and easing for each properties. Each duration/easing will follow the properties in the order you specified. In the given example below, `'left':'10px'` will take **300ms**, while` 'top':'15px'` will take **500ms**.

```js
HTMLElement.urAnimate(
    { 'left':'10px', 'top':'15px' },
    [ 300, 500 ],
    [ 'linear', 'inCubic' ]
)
```
