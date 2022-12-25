// ==UserScript==
// @name        职教云复习助手
// @namespace    http://playdreamer.cn/
// @include      https://*.zjy2.icve.com.cn/*
// @version      1.0.1
// @description  仅供复习，请勿用于非法用途
// @author       Coaixy
// @grant        none
// ==/UserScript==

setTimeout(() => {
    function copyToClip(content) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(content).then(
                // 复制成功callback
                function () {
                    alert("复制成功")
                    setTimeout(() => {
                        let sr = prompt("请输入答案数据:")
                        data = sr
                        let answer_list = data.split("$")
                        let answer_arr = new Array()
                        for (let index = 0; index < answer_list.length - 1; index++) {
                            const answer_data = answer_list[index];
                            answer_arr.push(answer_data)
                        }
                        let question_list_dom = document.querySelectorAll("div[data-questionid]")
                        for (let index = 0; index < question_list_dom.length; index++) {
                            const element = question_list_dom[index];
                            let check_list_dom_list = element.querySelectorAll("li[data-index]")
                            for (let index_2 = 0; index_2 < check_list_dom_list.length; index_2++) {
                                const element = check_list_dom_list[index_2];
                                if (element.innerHTML.indexOf(answer_list[index]) != -1) {
                                    element.click()
                                }
                            }
                        }
                    }, 5000);
                },
                // 复制失败callback
                function () {
                    alert("复制失败");
                },
            )
        }
    }
    function getValue(key1, key2, str) {

        var m = str.match(new RegExp(key1 + '(.*?)' + key2));

        return m ? m[1] : false;
    }
    function getDataId(str) {
        return getValue(' name="questionId" value="', '"', str)
    }
    let data_list = document.querySelectorAll("div[data-questionid]")
    let data = ""
    data_list.forEach(element => {
        let result = getDataId(element.innerHTML)
        if (result) {
            // console.log(result)
            data = data + result + "-"
        }
    });
    console.log(document)
    document.querySelector("#space > ul > li > a").innerHTML = "开启脚本"
    document.querySelector("#space > ul > li > a").href = "javascript:"
    document.querySelector("#space > ul > li > a").addEventListener("click", () => { copyToClip(data) })
}, 3000);
