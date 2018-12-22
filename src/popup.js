
//域名正则匹配
var regStr = '(\\w*:\/\/)?((\\w*\\-)*\\w*\.(com.cn|com|net.cn|net|org.cn|name|org|gov.cn|gov|cn|com.hk|mobi|me|info|name|biz|cc|tv|asia|hk|网络|公司|中国|ac.cn|bj.cn|sh.cn|tj.cn|cq.cn|he.cn|sx.cn|nm.cn|ln.cn|jl.cn|hl.cn|js.cn|zj.cn|ah.cn|fj.cn|jx.cn|sd.cn|ha.cn|hb.cn|hn.cn|gd.cn|gx.cn|hi.cn|sc.cn|gz.cn|yn.cn|xz.cn|sn.cn|gs.cn|qh.cn|nx.cn|xj.cn|tw.cn|hk.cn|mo.cn|travel|tw|com.tw|sh|ac|io|ws|us|tm|vc|ag|bz|in|mn|me|sc|co|org.tw|jobs|tel))';
var regx = new RegExp(regStr,'gi');

chrome.tabs.getSelected(null, function (tab) {

	var domain = '';
    var urlSplit = tab.url.match(regx);
    if(urlSplit[0]){
        domain = urlSplit[0];
	}
    domain = domain.replace('https://','');
    domain = domain.replace('http://','');

    document.getElementById('domainText').innerText = domain;
    var cookies = '';

    if (!chrome.cookies) {
        chrome.cookies = chrome.experimental.cookies;
    }

    chrome.cookies.getAll({},function (cookie) {
        for (i = 0; i < cookie.length; i++) {
            var domainResult = cookie[i].domain.match(regx);
            if (domainResult != null && domainResult.length > 0 && domain.toLowerCase() == domainResult[0].replace("/", "").toLowerCase()) {
                if(cookie[i].name){
                    cookies += cookie[i].name + "=" + cookie[i].value + "; ";
                }
            }
        }
        if (cookies != "") {
            cookies = cookies.substring(0, cookies.length - 2);
        }
        document.getElementById("cookieText").value = cookies;
    });
});
