/*
 *  yahiarefaiea-official-website-beta 1.0.0
 *  
 *  I’m a 21 years old handsome guy who grows up in a small town in Syria.
 *  http://beta.yahiarefaiea.com/
 *  hello@yahiarefaiea.com
 *  
 *  Last update on: 2018/10/24
 *  ©2018 Yahia Refaiea. all rights reserved.
 */

document.ready(function () {
  var input = getElementByClass('.field').find('input, textarea');
  input.keyup(function () {
    inputTest(this);
  });
});

function inputTest(that) {
  var field = $(that).closest('.field');
  var form = $(that).closest('form, .form');
  var length = $.trim($(that).val()).length;

  //  FILLED
  if (length > 0) field.addClass('filled');else field.removeClass('filled');

  //  VALIDATED
  if (length >= 4) {
    field.addClass('validated');
    form.addClass('validated');
  } else {
    field.removeClass('validated');
    form.removeClass('validated');
  }
}
var Timer = {
  length: null,
  time: null,
  selector: null,
  interval: null,
  callback: null,

  //  RUN
  run: function (selector, callback, length) {
    Timer.length = length;
    Timer.time = Timer.length;
    Timer.selector = selector;
    Timer.callback = callback;
    $(Timer.selector).text(Timer.length);
    Timer.interval = setInterval(Timer.count, 1000);
  },

  //  COUNT
  count: function () {
    Timer.time = Timer.time - 1;
    $(Timer.selector).text(Timer.time);
    if (Timer.time <= 0) {
      if (typeof Timer.callback === 'function' && Timer.callback) Timer.callback();
      Timer.reset();
    }
  },

  //  RESET
  reset: function () {
    clearInterval(Timer.interval);
    Timer.length = null;
    Timer.time = null;
    Timer.selector = null;
    Timer.interval = null;
    Timer.callback = null;
  }
};
var Identity = {
  duration: 1400,
  delay: 500,
  iteration: 0,
  processing: false,
  enough: false,
  interval: null,
  callback: null,
  status: 'loading',
  id: '#identity',
  selector: '#identity div',
  classes: 'working rest robot',

  //  WORK
  work: function () {
    if (Identity.status != 'loading') Identity.status = 'working';
    Identity.wait(function () {
      $(Identity.id).addClass('working');
    });
  },

  //  ROBOT
  robot: function () {
    Identity.status = 'robot';
    Identity.wait(function () {
      $(Identity.id).addClass('robot');
    });
  },

  //  REST
  rest: function () {
    Identity.abort();
    Identity.status = 'rest';
    setTimeout(function () {
      Identity.abort();
      $(Identity.id).addClass('rest');
    }, Identity.delay);
  },

  //  WAIT
  wait: function (call) {
    if (Identity.processing != true) {
      Identity.abort();
      Identity.processing = true;

      setTimeout(function () {
        if (typeof call === 'function' && call) call();
        Identity.waiting();
        Identity.interval = setInterval(Identity.waiting, Identity.duration);
      }, Identity.delay);
    }
  },

  //  WAITING
  waiting: function () {
    if (Identity.enough != true) {
      ++Identity.iteration;
      return;
    }

    Identity.stopping();
  },

  //  STOP
  stop: function (callback) {
    setTimeout(function () {
      if (Identity.processing == true) {
        Identity.enough = true;
        Identity.callback = callback;

        $(Identity.selector).attr('style', 'animation-iteration-count: ' + Identity.iteration + '; -webkit-animation-iteration-count: ' + Identity.iteration + ';');
      }
    }, Identity.delay);
  },

  //  STOPPING
  stopping: function () {
    clearInterval(Identity.interval);
    Identity.rest();

    if (typeof Identity.callback === 'function' && Identity.callback) Identity.callback();
    Identity.reset();
  },

  //  ABORT
  abort: function () {
    if (Identity.status == 'robot') $(Identity.id).removeClass('robot');else if (Identity.status != 'loading' && Identity.processing != true) $(Identity.id).removeClass(Identity.classes + ' loading');else $(Identity.id).removeClass(Identity.classes);
  },

  //  RESET
  reset: function () {
    Identity.iteration = 0;
    Identity.processing = false;
    Identity.enough = false;
    Identity.interval = null;
    Identity.callback = null;

    $(Identity.selector).removeAttr('style');
  }
};
var Stars = {
  canvas: null,
  context: null,
  circleArray: [],
  colorArray: ['#4c1a22', '#4c1a23', '#5d6268', '#1f2e37', '#474848', '#542619', '#ead8cf', '#4c241f', '#d6b9b1', '#964a47'],

  mouseDistance: 50,
  radius: .5,
  maxRadius: 1.5,

  //  MOUSE
  mouse: {
    x: undefined,
    y: undefined,
    down: false,
    move: false
  },

  //  INIT
  init: function () {
    this.canvas = document.getElementById('stars');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.display = 'block';
    this.context = this.canvas.getContext('2d');

    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('resize', this.resize);

    this.prepare();
    this.animate();
  },

  //  CIRCLE
  Circle: function (x, y, dx, dy, radius, fill) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = this.radius;

    this.draw = function () {
      Stars.context.beginPath();
      Stars.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      Stars.context.fillStyle = fill;
      Stars.context.fill();
    };

    this.update = function () {
      if (this.x + this.radius > Stars.canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > Stars.canvas.height || this.y - this.radius < 0) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;

      //  INTERACTIVITY
      if (Stars.mouse.x - this.x < Stars.mouseDistance && Stars.mouse.x - this.x > -Stars.mouseDistance && Stars.mouse.y - this.y < Stars.mouseDistance && Stars.mouse.y - this.y > -Stars.mouseDistance) {
        if (this.radius < Stars.maxRadius) this.radius += 1;
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    };
  },

  //  PREPARE
  prepare: function () {
    this.circleArray = [];

    for (var i = 0; i < 1200; i++) {
      var radius = Stars.radius;
      var x = Math.random() * (this.canvas.width - radius * 2) + radius;
      var y = Math.random() * (this.canvas.height - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 1.5;
      var dy = (Math.random() - 1) * 1.5;
      var fill = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];

      this.circleArray.push(new this.Circle(x, y, dx, dy, radius, fill));
    }
  },

  //  ANIMATE
  animate: function () {
    requestAnimationFrame(Stars.animate);
    Stars.context.clearRect(0, 0, Stars.canvas.width, Stars.canvas.height);

    for (var i = 0; i < Stars.circleArray.length; i++) {
      var circle = Stars.circleArray[i];
      circle.update();
    }
  },

  //  MOUSE MOVE
  mouseMove: function (event) {
    Stars.mouse.x = event.x;
    Stars.mouse.y = event.y;
  },

  //  RESIZE
  resize: function () {
    Stars.canvas.width = window.innerWidth;
    Stars.canvas.height = window.innerHeight;
  }
};
var renderer, scene, camera, ww, wh, particles;

ww = window.innerWidth, wh = window.innerHeight;

var centerVector = new THREE.Vector3(0, 0, 0);
var previousTime = 0;
speed = 10;
isMouseDown = false;

var getImageData = function (image) {

	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0);

	return ctx.getImageData(0, 0, image.width, image.height);
};

function getPixel(imagedata, x, y) {
	var position = (x + imagedata.width * y) * 4,
	    data = imagedata.data;
	return { r: data[position], g: data[position + 1], b: data[position + 2], a: data[position + 3] };
}

var drawTheMap = function () {

	var geometry = new THREE.Geometry();
	var material = new THREE.PointCloudMaterial();
	material.vertexColors = true;
	material.transparent = true;
	for (var y = 0, y2 = imagedata.height; y < y2; y += 1) {
		for (var x = 0, x2 = imagedata.width; x < x2; x += 1) {
			if (imagedata.data[x * 4 + y * 4 * imagedata.width] > 0) {

				var vertex = new THREE.Vector3();
				vertex.x = x - imagedata.width / 2 + (500 - 440 * .5);
				vertex.y = -y + imagedata.height / 2;
				vertex.z = -Math.random() * 500;

				vertex.speed = Math.random() / speed + 0.015;

				var pixelColor = getPixel(imagedata, x, y);
				var color = "rgb(" + pixelColor.r + ", " + pixelColor.g + ", " + pixelColor.b + ")";
				geometry.colors.push(new THREE.Color(color));
				geometry.vertices.push(vertex);
			}
		}
	}
	particles = new THREE.Points(geometry, material);

	scene.add(particles);

	requestAnimationFrame(render);
};

var init = function () {
	renderer = new THREE.WebGLRenderer({
		canvas: document.getElementById("yahia"),
		antialias: true,
		alpha: true
	});
	renderer.setSize(ww, wh);

	scene = new THREE.Scene();

	camera = new THREE.OrthographicCamera(ww / -2, ww / 2, wh / 2, wh / -2, 1, 1000);
	camera.position.set(0, -20, 4);
	camera.lookAt(centerVector);
	scene.add(camera);
	camera.zoom = 1;
	camera.updateProjectionMatrix();

	imagedata = getImageData(image);
	drawTheMap();

	window.addEventListener('mousemove', onMousemove, false);
	window.addEventListener('mousedown', onMousedown, false);
	window.addEventListener('mouseup', onMouseup, false);
	window.addEventListener('resize', onResize, false);
};
var onResize = function () {
	ww = window.innerWidth;
	wh = window.innerHeight;
	renderer.setSize(ww, wh);
	camera.left = ww / -2;
	camera.right = ww / 2;
	camera.top = wh / 2;
	camera.bottom = wh / -2;
	camera.updateProjectionMatrix();
};

var onMouseup = function () {
	isMouseDown = false;
};
var onMousedown = function (e) {
	isMouseDown = true;
	lastMousePos = { x: e.clientX, y: e.clientY };
};
var onMousemove = function (e) {
	if (isMouseDown) {
		camera.position.x += (e.clientX - lastMousePos.x) / 100;
		camera.position.y -= (e.clientY - lastMousePos.y) / 100;
		camera.lookAt(centerVector);
		lastMousePos = { x: e.clientX, y: e.clientY };
	}
};

var render = function (a) {

	requestAnimationFrame(render);

	particles.geometry.verticesNeedUpdate = true;
	if (!isMouseDown) {
		camera.position.x += (0 - camera.position.x) * 0.06;
		camera.position.y += (0 - camera.position.y) * 0.06;
		camera.lookAt(centerVector);
	}

	renderer.render(scene, camera);
};

var imgData = 'data:image/png;base64,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';

var image = document.createElement("img");
image.src = imgData;
var Submit = {

  //  DATA
  data: function (template, fields) {
    var data = {};
    for (i = 0; i < fields.length; i++) {
      var field = $(fields[i]);
      var name = field.attr('name');
      var value = field.val().replace(/(?:\r\n|\r|\n)/g, '<br>');
      data[name] = value;
    }

    return data;
  },

  //  PUSH
  push: function (form) {
    var template = getElementByClass('.template[data-template=' + form + ']');
    var fields = template.find('.field input, .field textarea');

    //  WAITING
    Submit.view('[data-status=waiting]', template);

    //  AJAX
    $.ajax({
      type: 'POST',
      url: 'includes/php/' + form + '.php',
      data: { dd: JSON.stringify(Submit.data(template, fields)) },
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        Submit.callback('error', form, template, fields);
      },
      success: function (data) {
        Submit.callback('success', form, template, fields);
      }
    });
  },

  //  CALLBACK
  callback: function (status, form, template, fields) {
    setTimeout(function () {

      //  SUCCESS
      if (status == 'success') {
        template.find('.form .status').removeClass('current');
        fields.closest('.field').fadeOut(700);
        fields.closest('.form').find('.submit').fadeOut(700);
        Identity.stop();

        if (form == 'secret') secretAvailability = false;else if (form == 'opinion') opinionAvailability = false;

        setTimeout(function () {
          fields.closest('.form').find('.submit').remove();
          fields.closest('.field').remove();
          template.find('.form .status[data-status=success]').addClass('current');
        }, 750);
      }

      //  ERROR
      else {
          Submit.view('[data-status=error]', template);
          setTimeout(function () {
            Submit.view(':not([data-status])', template);
          }, 6000);
        }
    }, 4000);
  },

  //	VIEW
  view: function (selector, template) {
    template.find('.form .status').removeClass('current');
    template.find('.form .status' + selector).addClass('current');
  },

  //	LISTEN
  listen: function (selector) {
    $(selector).on('click', function (e) {
      if ($(this).closest('.form').hasClass('validated')) {
        var form = $(this).attr('data-form');
        Submit.push(form);
      }

      e.preventDefault();
    });
  }
};
var Router = {
	wrapper: [],
	location: null,

	//	ROUTE
	route: function (location, callback) {
		Identity.work();
		Router.location = Router.processLocation(location);

		//	ROUTES
		Router.routes(callback);
	},

	//	PROCESS LOCATION
	processLocation: function (location) {
		if (location === undefined) location = window.location.hash;

		return location.replace('#', '');
	},

	//	CALLBACK
	callback: function (callback) {
		setTimeout(function () {
			Identity.stop();
      Router.updateWrapper();
      Router.updateTemplate(Router.wrapper[0]);
      window.location.hash = Router.location;
      Router.location = null;

      //  CALLBACKS
      Router.callbacks(Router.wrapper[0]);
      if (typeof callback === 'function' && callback) callback();
		}, 200);
	},

	//	UPDATE TEMPLATE
	updateTemplate: function (template) {
		var templates = getElementByClass('.template');
		var current = getElementByClass('.template[data-template=' + template + ']');

		templates.removeClass('current');
		setTimeout(function () {
			templates.hide();
			current.show().addClass('current');
		}, 1120);
	},

	//	UPDATE WRAPPER
	updateWrapper: function (push, pull) {
		if (push) Router.push(push);
		if (pull) Router.pull(pull);

		var wrapper = Router.wrapper.toString().replace(/,/g, ' ');
		getElementByClass('.wrapper').attr('class', 'wrapper ' + wrapper);
	},

	//	PUSH
	push: function (items) {
		items = items.split(' ');

		for (i = 0; i < items.length; i++) {
			if (!Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.push(items[i]);
		}
	},

	//	PULL
	pull: function (items) {
		items = items.split(' ');

		for (i = 0; i < items.length; i++) {
			if (Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.splice(Router.wrapper.indexOf(items[i]), 1);
		}
	},

	//	LISTEN
	listen: function () {
		getElementByClass('.wrapper').on('click', '.router', function (e) {
			Router.route($(this).attr('href'), window[$(this).attr('data-callback')]);
			e.preventDefault();
		});

		window.addEventListener('popstate', function (e) {
			Router.route(undefined);
		});
	}
};
Router.routes = function (callback) {
  Router.wrapper = [];
  var location = Router.location.split('/').filter(Boolean);

  //  HOME
  Router.push('home');

  //  CALLBACK
  Router.callback(callback);
};
Router.callbacks = function (wrapper) {
  if (wrapper == 'secret') secret();else if (wrapper == 'opinion') opinion();else if (wrapper == 'bucketAll') bucketAll();else if (wrapper == 'notFound') notFound();
};
var secretAvailability = true;
function secret() {
  if (secretAvailability == true) {
    setTimeout(function () {
      var input = getElementByClass('.template[data-template=secret] .field').find('input, textarea');

      input.focus();
      Identity.robot();
    }, Identity.duration * 1.25);
  }
}
var opinionAvailability = true;
function opinion() {
  if (opinionAvailability == true) {
    setTimeout(function () {
      var input = getElementByClass('.template[data-template=opinion] .field').find('input, textarea');

      input.focus();
      Identity.robot();
    }, Identity.duration * 1.25);
  }
}
function bucketAll() {
  var list = getElementByClass('.template[data-template=bucketAll] .bucketList');
  var link = list.find('li.archived a');

  //  LISTEN
  link.hover(function () {
    list.addClass('hover');
  }, function () {
    list.removeClass('hover');
  });
}
function notFound() {
  setTimeout(function () {
    Timer.run('.template[data-template=notFound] time', function () {
      Router.route('#');
    }, 5);
  }, Identity.duration * 1.25);
}

function notFoundCallback() {
  Timer.reset();
}
var md = new MobileDetect(window.navigator.userAgent);

document.ready(function () {
  Identity.work();
  getElementByClass('.template main').mCustomScrollbar({
    theme: 'dark'
  });
});

function loadProject() {
  Router.route(undefined, function () {

    //  CALLBACK
    Router.listen();
    Submit.listen('.submit');
    if (!md.mobile()) {
      Stars.init();
      init();
    }
    setTimeout(function () {
      getElementById('#signature').removeClass('loading');
    }, Identity.delay * 1.5);
  });
};

loadProject();