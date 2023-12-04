
import React, { useEffect, useState } from "react";
import Style from "./Ads.module.css";

const Ads = () => {
  const [adScript, setAdScript] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 551) {
        setAdScript(`
          <script type="text/javascript">
            atOptions = {
              'key' : 'f43f5857097d74aeb88b88bb4533e37d',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/f43f5857097d74aeb88b88bb4533e37d/invoke.js"></scr' + 'ipt>');
          </script>
        `);
      } else if (window.innerWidth >= 551 && window.innerWidth <= 1024) {
        setAdScript(`
          <script type="text/javascript">
            atOptions = {
              'key' : 'a8bb164e951cde22acbf0c5047466f7a',
              'format' : 'iframe',
              'height' : 60,
              'width' : 468,
              'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/a8bb164e951cde22acbf0c5047466f7a/invoke.js"></scr' + 'ipt>');
          </script>
        `);
      } else {
        setAdScript(`
          <script type="text/javascript">
            atOptions = {
              'key' : 'f431300ee3c352f99d04fd721b580db9',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/f431300ee3c352f99d04fd721b580db9/invoke.js"></scr' + 'ipt>');
          </script>
        `);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={Style.adbanner_import} dangerouslySetInnerHTML={{ __html: adScript }}>
    </div>
  );
};

export default Ads;





