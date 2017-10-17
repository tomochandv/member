var Paging = {
  Pagenation : (totalCount, currentPage) => {
    let totalPage = Math.ceil(totalCount/10)
    let startPage = ((currentPage ) / 10) * 10 
    let endPage = (startPage + 10) -1
    endPage = endPage > totalPage ? totalPage : endPage
    let html = '<li class="page-item"><a class="page-link" href="javascript:Page.Search(1)">First</a></li>'
    for(var i= startPage; i <= endPage; i++){
      if(i == currentPage){
        html += '<li class="page-item active"><a class="page-link" href="javascript:Page.Search(' + i + ')">' + i + '</a></li>'
      }
      else{
        html += '<li class="page-item"><a class="page-link" href="javascript:Page.Search(' + i + ')">' + i + '</a></li>'
      }
    }
    //next
    if((endPage+1) >= totalPage){
      html += '<li class="page-item disabled"><a class="page-link" href="javascript:Page.Search(' +totalPage+ ')">Next</a></li>'
    }
    else{
      html += '<li class="page-item"><a class="page-link" href="javascript:Page.Search(' + (endPage+1) + ')">Next</a></li>'
    }
    $("#pagenation > li").remove()
    $("#pagenation").append(html)
    // console.log(totalPage)
    // console.log(startPage)
    // console.log(endPage)
  },
  PagenationRow : (totalCount, currentPage, row) => {
    let totalPage = Math.ceil(totalCount/row)
    let startPage = ((currentPage ) / row) * row 
    let endPage = (startPage + row) -1
    endPage = endPage > totalPage ? totalPage : endPage
    let html = '<li class="page-item"><a class="page-link" href="javascript:Page.Search(1)">First</a></li>'
    for(var i= startPage; i <= endPage; i++){
      if(i == currentPage){
        html += '<li class="page-item active"><a class="page-link" href="javascript:Page.Search(' + i + ')">' + i + '</a></li>'
      }
      else{
        html += '<li class="page-item"><a class="page-link" href="javascript:Page.Search(' + i + ')">' + i + '</a></li>'
      }
    }
    //next
    if((endPage+1) >= totalPage){
      html += '<li class="page-item disabled"><a class="page-link" href="javascript:Page.Search(' +totalPage+ ')">Next</a></li>'
    }
    else{
      html += '<li class="page-item"><a class="page-link" href="javascript:Page.Search(' + (endPage+1) + ')">Next</a></li>'
    }
    $("#pagenation > li").remove()
    $("#pagenation").append(html)
    // console.log(totalPage)
    // console.log(startPage)
    // console.log(endPage)
  }
}

var Utill = {
  TimeConvert : function(time){
    const d = new Date(time *1000)
    const yyyy = d.getFullYear().toString()
    const mm = (d.getMonth() + 1).toString()
    const dd = d.getDate().toString()
    const hh = d.getHours().toString()
    const min = d.getMinutes().toString()
    const ss = d.getSeconds().toString()
    const dateString = yyyy + '-' + (mm.length == 1 ? '0'+ mm : mm) + '-'
      + (dd.length == 1 ? '0'+dd : dd) + ' ' + (hh.length == 1 ? '0'+hh : hh) + ':' 
      + (min.length == 1 ? '0'+min : min) + ':' + (ss.length == 1 ? '0'+ss : ss)
    return dateString
  },
  EthCaculate: function(value){
    const wei = 1000000000000000000
    const mode = value / wei
    return mode.toFixed(3)
  },
  TimeStringtoDate : function(date){
    const d = new Date(Date.parse(date))
    const yyyy = d.getFullYear().toString()
    const mm = (d.getMonth() + 1).toString()
    const dd = d.getDate().toString()
    const hh = d.getHours().toString()
    const min = d.getMinutes().toString()
    const ss = d.getSeconds().toString()
    const dateString = yyyy + '-' + (mm.length == 1 ? '0'+ mm : mm) + '-'
      + (dd.length == 1 ? '0'+dd : dd) + ' ' + (hh.length == 1 ? '0'+hh : hh) + ':' 
      + (min.length == 1 ? '0'+min : min) + ':' + (ss.length == 1 ? '0'+ss : ss)
    return dateString
  }
}