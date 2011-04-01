// All credit goes to Rick Olson.
(function($) {
	$.fn.relatizeDate = function() {
		return $(this).each(function() {
			if ($(this).hasClass('relatized')) {
				return;
			}
			$(this).text($.relatizeDate(this)).addClass('relatized');
		});
	};
	$.relatizeDate = function(element) {
		return $.relatizeDate.timeAgoInWords(Date.parse($(element).text()));
	};
	$.extend($.relatizeDate, {
		shortDays : [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
		days : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
		shortMonths : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		months : [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
		/**
		 * Given a formatted string, replace the necessary items
		 * and return. Example: Time.now().strftime("%B %d, %Y") =>
		 * February 11, 2008
		 * 
		 * @param {String}
		 *            format The formatted string used to format
		 *            the results
		 */
		strftime : function(date, format) {
			var day = date.getDay(), month = date.getMonth();
			var hours = date.getHours(), minutes = date.getMinutes();
			var pad = function(num) {
				var string = num.toString(10);
				return new Array((2 - string.length) + 1).join('0') + string;
			};
			return format.replace(/\%([aAbBcdHImMpSwyY])/g, function(part) {
				switch (part[1]) {
				case 'a':
					return $.relatizeDate.shortDays[day];
				case 'A':
					return $.relatizeDate.days[day];
				case 'b':
					return $.relatizeDate.shortMonths[month];
				case 'B':
					return $.relatizeDate.months[month];
				case 'c':
					return date.toString();
				case 'd':
					return pad(date.getDate());
				case 'H':
					return pad(hours);
				case 'I':
					return pad((hours + 12) % 12);
				case 'm':
					return pad(month + 1);
				case 'M':
					return pad(minutes);
				case 'p':
					return hours > 12 ? 'PM' : 'AM';
				case 'S':
					return pad(date.getSeconds());
				case 'w':
					return day;
				case 'y':
					return pad(date.getFullYear() % 100);
				case 'Y':
					return date.getFullYear().toString();
				}
			});
		},
		timeAgoInWords : function(targetDate, includeTime) {
			return $.relatizeDate.distanceOfTimeInWords(targetDate, new Date(), includeTime);
		},
		/**
		 * Return the distance of time in words between two
		 * Date's Example: '5 days ago', 'about an hour ago'
		 * 
		 * @param {Date}
		 *            fromTime The start date to use in the
		 *            calculation
		 * @param {Date}
		 *            toTime The end date to use in the
		 *            calculation
		 * @param {Boolean}
		 *            Include the time in the output
		 */
		distanceOfTimeInWords : function(fromTime, toTime, includeTime) {
			var delta = parseInt((toTime.getTime() - fromTime.getTime()) / 1000);
			if (delta < 60) {
				return 'just now';
			} else if (delta < 120) {
				return 'about a minute ago';
			} else if (delta < (45 * 60)) {
				return (parseInt(delta / 60)).toString() + ' minutes ago';
			} else if (delta < (120 * 60)) {
				return 'about an hour ago';
			} else if (delta < (24 * 60 * 60)) {
				return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
			} else if (delta < (48 * 60 * 60)) {
				return '1 day ago';
			} else {
				var days = (parseInt(delta / 86400)).toString();
				if (days > 5) {
					var fmt = '%B %d, %Y';
					if (includeTime) {
						fmt += ' %I:%M %p';
					}
					return $.relatizeDate.strftime(fromTime, fmt);
				} else {
					return days + " days ago";
				}
			}
		}
	});
})(jQuery);
