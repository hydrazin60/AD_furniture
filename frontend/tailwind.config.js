module.exports = {
    theme: {
      extend: {
        animation: {
          showContent: 'showContent 0.5s 1s linear forwards',
          showImage: 'showImage 0.5s linear forwards',
          showThumbnail: 'showThumbnail 0.5s linear forwards',
          effectNext: 'effectNext 0.5s linear forwards',
          runningTime: 'runningTime 3s linear 1 forwards',
          contentOut: 'contentOut 1.5s linear 1 forwards',
        },
        keyframes: {
          showContent: {
            to: {
              transform: 'translateY(0)',
              filter: 'blur(0)',
              opacity: '1',
            },
          },
          showImage: {
            to: {
              bottom: '0',
              left: '0',
              width: '100%',
              height: '100%',
              borderRadius: '0',
            },
          },
          showThumbnail: {
            from: {
              width: '0',
              opacity: '0',
            },
          },
          effectNext: {
            from: {
              transform: 'translateX(150px)',
            },
          },
          runningTime: {
            from: {
              width: '100%',
            },
            to: {
              width: '0%',
            },
          },
          contentOut: {
            to: {
              transform: 'translateY(-150px)',
              filter: 'blur(20px)',
              opacity: '0',
            },
          },
        },
      },
    },
  }
  