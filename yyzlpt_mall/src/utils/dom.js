export const addClass = (target, className) => {
  if (className) {
    if (target.classList) {
      target.classList.add(className)
    } else if (!hasClass(target, className)) {
      target.className = `${target.className} ${className}`
    }
  }
  return target
}

export const hasClass = (target, className) => {
  if (target.classList) {
    return !!className && target.classList.contains(className)
  }
  return ` ${target.className} `.indexOf(` ${className} `) !== -1
}

export const removeClass = (target, className) => {
  if (className) {
    if (target.classList) {
      target.classList.remove(className)
    } else {
      target.className = target.className
        .replace(new RegExp(`(^|\\s)${className}(?:\\s|$)`, "g"), "$1")
        .replace(/\s+/g, " ")
        .replace(/^\s*|\s*$/g, "")
    }
  }
  return target
}

export function getRect(el) {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

// 在body里面新增一个元素
export function appendToBody(el) {
  let body  = document.body
  body.appendChild(el)
  return el
}

//删除body的一个子元素
export function removeBodyEnd(el) {
  let body  = document.body
  body.removeChild(el)
  return el
}

export function offsetBody(elm,deraction='Top') {
  let dereatName = `offset${deraction}`
  let top = elm.offsetTop;
  let  cur = elm.offsetParent
  while(cur!=null){
    top += cur[dereatName]
    cur = cur.offsetParent
  }
  return top
}

