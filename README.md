veinjs
======

Injects CSS into the document (it's a perfectly legal procedure)

# What is CSS injection?
CSS injection is the process of injecting CSS definitions into a document dynamically.

If you want to see it in action, see this demo:
http://israelidanny.github.io/veinjs/

# Why inject?
- *Persistence* - Say you want to dynamically make all your sub headers a certain color. You apply CSS properties with jQuery, and everything looks great. But then, you load some more stuff with AJAX, and you notice that your CSS is useless, because it has been only applied to the elements currently living in DOM. That's when injection can save you headache. Just apply any CSS code once, and it's valid - until the next refresh!

- *Performance* - Our minions at jsperf.com tell us that injecting CSS rules for a vast number of elements is VERY fast, check it out for yourself: http://jsperf.com/inject-vs-apply/2

- *Media Query Support* - You can inject media queries and work responsive magic with veinjs dynamically.

# How do I use veinjs?

## Step 1 - Include your Javascript
Veinjs has no dependencies, so just include vein.js, wherever it lives on your server:
```html
<script src="vein.js"></script>
```

## Step 2 - Inject!
Now you can inject CSS.

Here are a few examples:

### Basic Usage
Let's change all our headers to the color red.
```javascript
vein.inject('h1', {'color' : 'red'});
```

### Multiple Selectors
Now, let's change both h2 and h3 to greens, and make them bold!
```javascript
vein.inject(['h2', 'h3'], {'color' : 'green', 'font-weight' : 'bold'});
```

### Canceling a property
Alright, maybe not bold...
```javascript
vein.inject(['h2', 'h3'], {'color' : 'green', 'font-weight' : null});
```

### Canceling a ruleset by selector
You know what? Red headers look ugly, let's cancel that.
```javascript
vein.inject('h1', null);
```

# Media Queries
veinjs works with media queries, just like it does with regular selectors.

For instance, let's dynamically apply CSS to make all our secondary headers red on small screens!
```javascript
vein.inject([{
    '@media (max-width: 768px)': ['h2']
}], {
    'color': '#f00'
});
```

# Component support

```js
var vein = require('veinjs');
vein.inject('h1', {'color' : 'red'});
```

That's about all there is to know! Happy injecting!
If you find any interesting uses for this little library, please let me know!

Issues and Pull Requests are more than welcome!

If you have any questions, drop me a line at:
danny@caffeine.co.il
