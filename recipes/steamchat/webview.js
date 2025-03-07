'use strict';

const { ipcRenderer } = require('electron');

module.exports = Franz => {
  const getMessages = function getMessages() {
    // get new msg count
    let count = 0;
    let counters = document.querySelectorAll("[class*=FriendMessageCount]");
    [].filter.call(counters, countValue => {
      if (countValue) {
          count += parseInt(countValue.innerHTML);
      }
    });

	const indirectMessages = document.querySelectorAll("[class*=ChatUnreadMessageIndicator]").length;
    Franz.setBadge(count, indirectMessages);

    // force scroll to bottom of chat window
    const chatBoxes = document.querySelectorAll('.chat_dialog');
    if (chatBoxes) {
      const chatBox = [].filter.call(chatBoxes, chat => {
        return chat.style.display !== 'none';
      });
      if (chatBox[0]) {
        const chatWindow = chatBox[0].querySelector('.chat_dialog_scroll');
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    }
  };

  Franz.loop(getMessages);

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="http"]');

    if (link && link.getAttribute('target') === '_top') {
      const url = link.getAttribute('href');
      event.preventDefault();
      event.stopPropagation();
      ipcRenderer.sendToHost('new-window', url);
    }
  }, true);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZWFtY2hhdC93ZWJ2aWV3LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJGcmFueiIsImdldE1lc3NhZ2VzIiwiY291bnQiLCJjb3VudGVycyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiTWF0aCIsImZsb29yIiwibGVuZ3RoIiwiZmlsdGVyIiwiY291bnRWYWx1ZXMiLCJjb3VudFZhbHVlIiwicXVlcnlTZWxlY3RvciIsImlubmVySFRNTCIsInBhcnNlSW50Iiwic2V0QmFkZ2UiLCJjaGF0Qm94ZXMiLCJjaGF0Qm94IiwiY2hhdCIsInN0eWxlIiwiZGlzcGxheSIsImNoYXRXaW5kb3ciLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJsb29wIl0sIm1hcHBpbmdzIjoiOztBQUVBQSxPQUFPQyxPQUFQLEdBQWtCQyxLQUFELElBQVc7QUFDMUIsUUFBTUMsY0FBYyxTQUFTQSxXQUFULEdBQXVCO0FBQ3pDO0FBQ0EsUUFBSUMsUUFBUSxDQUFaO0FBQ0EsUUFBSUMsV0FBV0MsU0FBU0MsZ0JBQVQsQ0FBMEIscURBQTFCLENBQWY7QUFDQUYsZUFBV0csTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCTixRQUEzQixFQUFxQ08sS0FBS0MsS0FBTCxDQUFXUixTQUFTUyxNQUFULEdBQWtCLENBQTdCLENBQXJDLENBQVg7QUFDQSxPQUFHQyxNQUFILENBQVVKLElBQVYsQ0FBZU4sUUFBZixFQUEwQlcsV0FBRCxJQUFpQjtBQUN4QyxVQUFJQSxXQUFKLEVBQWlCO0FBQ2YsY0FBTUMsYUFBYUQsWUFBWUUsYUFBWixDQUEwQiw2QkFBMUIsQ0FBbkI7QUFDQSxZQUFJRCxXQUFXRSxTQUFYLENBQXFCTCxNQUFyQixHQUE4QixDQUFsQyxFQUFxQztBQUNuQ1YsbUJBQVNnQixTQUFTSCxXQUFXRSxTQUFwQixDQUFUO0FBQ0Q7QUFDRjtBQUNGLEtBUEQ7QUFRQWpCLFVBQU1tQixRQUFOLENBQWVqQixLQUFmOztBQUVBO0FBQ0EsVUFBTWtCLFlBQVloQixTQUFTQyxnQkFBVCxDQUEwQixjQUExQixDQUFsQjtBQUNBLFFBQUllLFNBQUosRUFBZTtBQUNiLFlBQU1DLFVBQVUsR0FBR1IsTUFBSCxDQUFVSixJQUFWLENBQWVXLFNBQWYsRUFBMkJFLElBQUQsSUFBVTtBQUNsRCxlQUFPQSxLQUFLQyxLQUFMLENBQVdDLE9BQVgsS0FBdUIsTUFBOUI7QUFDRCxPQUZlLENBQWhCO0FBR0EsVUFBSUgsUUFBUSxDQUFSLENBQUosRUFBZ0I7QUFDZCxjQUFNSSxhQUFhSixRQUFRLENBQVIsRUFBV0wsYUFBWCxDQUF5QixxQkFBekIsQ0FBbkI7QUFDQVMsbUJBQVdDLFNBQVgsR0FBdUJELFdBQVdFLFlBQWxDO0FBQ0Q7QUFDRjtBQUNGLEdBMUJEOztBQTRCQTNCLFFBQU00QixJQUFOLENBQVczQixXQUFYO0FBQ0QsQ0E5QkQiLCJmaWxlIjoic3RlYW1jaGF0L3dlYnZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxubW9kdWxlLmV4cG9ydHMgPSAoRnJhbnopID0+IHtcbiAgY29uc3QgZ2V0TWVzc2FnZXMgPSBmdW5jdGlvbiBnZXRNZXNzYWdlcygpIHtcbiAgICAvLyBnZXQgbmV3IG1zZyBjb3VudFxuICAgIGxldCBjb3VudCA9IDA7XG4gICAgbGV0IGNvdW50ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVucmVhZF9tZXNzYWdlX2NvdW50Om5vdChbc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiXSknKTtcbiAgICBjb3VudGVycyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGNvdW50ZXJzLCBNYXRoLmZsb29yKGNvdW50ZXJzLmxlbmd0aCAvIDIpKTtcbiAgICBbXS5maWx0ZXIuY2FsbChjb3VudGVycywgKGNvdW50VmFsdWVzKSA9PiB7XG4gICAgICBpZiAoY291bnRWYWx1ZXMpIHtcbiAgICAgICAgY29uc3QgY291bnRWYWx1ZSA9IGNvdW50VmFsdWVzLnF1ZXJ5U2VsZWN0b3IoJy51bnJlYWRfbWVzc2FnZV9jb3VudF92YWx1ZScpO1xuICAgICAgICBpZiAoY291bnRWYWx1ZS5pbm5lckhUTUwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvdW50ICs9IHBhcnNlSW50KGNvdW50VmFsdWUuaW5uZXJIVE1MKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIEZyYW56LnNldEJhZGdlKGNvdW50KTtcblxuICAgIC8vIGZvcmNlIHNjcm9sbCB0byBib3R0b20gb2YgY2hhdCB3aW5kb3dcbiAgICBjb25zdCBjaGF0Qm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhdF9kaWFsb2cnKTtcbiAgICBpZiAoY2hhdEJveGVzKSB7XG4gICAgICBjb25zdCBjaGF0Qm94ID0gW10uZmlsdGVyLmNhbGwoY2hhdEJveGVzLCAoY2hhdCkgPT4ge1xuICAgICAgICByZXR1cm4gY2hhdC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZSc7XG4gICAgICB9KTtcbiAgICAgIGlmIChjaGF0Qm94WzBdKSB7XG4gICAgICAgIGNvbnN0IGNoYXRXaW5kb3cgPSBjaGF0Qm94WzBdLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0X2RpYWxvZ19zY3JvbGwnKTtcbiAgICAgICAgY2hhdFdpbmRvdy5zY3JvbGxUb3AgPSBjaGF0V2luZG93LnNjcm9sbEhlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgRnJhbnoubG9vcChnZXRNZXNzYWdlcyk7XG59O1xuIl19