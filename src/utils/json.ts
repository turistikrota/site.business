type DataArray = {
  Key: string
  Value: string
}

const jsonArrayToObject = (data: DataArray[]) => {
  const obj: Record<string, string> = {}
  data.forEach((d) => {
    obj[d.Key] = d.Value
  })
  return obj
}
