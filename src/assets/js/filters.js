export function cutAr (val) {
  if (val.length === 1) {
    return val[0].name
  } else {
    return `${val[0].name}/${val[1].name}`
  }
}
