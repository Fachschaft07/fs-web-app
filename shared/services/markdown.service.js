'use strict';
(function () {
  angular
      .module('fsApp.data.markdown', [])
      .factory('markdownFactory', function () {
          var REGEX_BOLD = /\$?\*([^\*]+)\*/,
              REGEX_LIST = /\s(?:(\.(?!\.)[^\n]+)+|\.\s)/,
              REGEX_URL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/,
              NEW_LINE_TAG = "<br/>",
              BOLD_OPENING_TAG = "<b>",
              BOLD_CLOSING_TAG = "</b>",
              LINK_OPENING_TAG = "<a href='$href'>",
              LINK_CLOSING_TAG = "</a>";

          this.toHtml = function (text) {
            // The order of these statements is important!!!
            var result = this.replaceBoldStrings(text); // replace all bold parts
            result = result.replace("#", "\n"); // replace all # with new lines
            result = result.replace(/<br\/?>+\s*<br\/?>/g, '\n');
            result = result.replace(/\n\s*\n/g, '\n');
            result = this.replaceList(result); // replace the list syntax with a unicode sign
            result = this.replaceUrl(result); // replace urls
            result = result.replace(/\n/g, NEW_LINE_TAG); // replace all new lines with html tags
            return result; // create the html code
          };

          this.replaceUrl = function (raw) {
            var result = "",
                match, start;

            while ((match = raw.match(REGEX_URL)) !== null) {
              start = raw.indexOf(match[0]);

              result += raw.substring(0, start); // get everything before the match
              result += LINK_OPENING_TAG.replace("$href", match[0]); // insert the opening bold html tag
              result += match[0]; // insert the matching part
              result += LINK_CLOSING_TAG; // insert the closing bold html tag

              raw = raw.substring(start + match[0].length, raw.length); // save the last position
            }

            if (raw.length > 0) { // if the last position is not the end of string
              result += raw; // append the rest of the string
            }

            return result;
          };

          this.replaceBoldStrings = function (raw) {
            var result = "",
                match, start;

            while ((match = raw.match(REGEX_BOLD)) !== null) {
              start = raw.indexOf(match[0]);

              result += raw.substring(0, start); // get everything before the match
              result += BOLD_OPENING_TAG; // insert the opening bold html tag
              result += match[1]; // insert the matching part
              result += BOLD_CLOSING_TAG; // insert the closing bold html tag

              raw = raw.substring(start + match[0].length, raw.length); // save the last position
            }

            if (raw.length > 0) { // if the last position is not the end of string
              result += raw; // append the rest of the string
            }

            return result;
          };

          this.replaceList = function (raw) {
            var result = "",
                match = null,
                group = null,
                substring = null,
                start = 0,
                listDetected = false;

            while ((match = raw.match(REGEX_LIST)) !== null) {
              if (!listDetected) {
                result += NEW_LINE_TAG;
                result += NEW_LINE_TAG;
              }
              listDetected = true;
              start = raw.indexOf(match[0]);

              group = match[1];
              if (group) {
                substring = group.substring(1, group.length);

                result += raw.substring(0, start);
                result += NEW_LINE_TAG;
                result += "&#8226 "; // HTML-Tag-Dot
                result += substring;
              }

              raw = raw.substring(start + match[0].length, raw.length);
            }

            if (listDetected && raw.length > 0) {
              result += NEW_LINE_TAG;
              result += NEW_LINE_TAG;
              result += raw;
            } else if (!listDetected) {
              result += raw;
            }

            return result;
          };

          return {
              toMarkdown: function(text) {
                  return toHtml(text);
              }
          }
        });
})();
