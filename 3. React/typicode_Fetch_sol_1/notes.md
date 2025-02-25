```jsx

<main>
  {  {fetchError}  ?  ( <p className = "ErrorPara">{fetchError}</p> ) : 
  (
    <JSONList JSONObjList = {jsonList} />
  )}
</main>
```
dit is fout om dat {} fetch error een leeg object maakt en dus altijd waar is dan , moet zonder {}

# Object.entries
```jsx
 <ul className= "innerUl">
  {Object.entries(value).map(([subKey, subValue], subIndex) => (
      <li key = {subKey} className={subIndex % 2 === 0 ? "evenInnerUl" : "oddInnerUl"}>
          <span>{subKey} : </span>
          <span>{typeof subValue === "object" ? JSON.stringify(subValue) : subValue}</span>
      </li>  
  ))}
  </ul>

```

Object.entries zet een object om in een nested Array op 1 level, een nested object wordt niet omgezet in een volledige array maar in en enkele met key value en dan value als object bijvoorbeeld

```js
Object
const data = {
  id: 1,
  name: "Product A",
  details: {
    price: 19.99,
    stock: 50,
    manufacturer: {
      name: "TechCorp",
      country: "USA"
    }
  }
};
Object na entries
[
  ["id", 1],
  ["name", "Product A"],
  ["details", { price: 19.99, stock: 50, manufacturer: { name: "TechCorp", country: "USA" } }]
]

```
# code voorbeeld
```jsx

const JSONListItem = ({ item }) => {
    const spanKeyClass = "listItemKey";
    const spanValueClass = "listItemValue";


    return (
        <li className="outLiCompleteListItem">
        {Object.entries(item).map(([key, value], index) => (
            <div key={key}>
                <span className={index === 0 ? "mainKeyListItem" : ""}>{index === 0 ? `${key} [${value}]` : `${key} :` }</span>
                <span>
                    {typeof value ==="object" ? 
                    (
                    <ul className= "innerUl">
                    {Object.entries(value).map(([subKey, subValue], subIndex) => (
                        <li key = {subKey} className={subIndex % 2 === 0 ? "evenInnerUl" : "oddInnerUl"}>
                            <span>{subKey} : </span>
                            <span>{typeof subValue === "object" ? JSON.stringify(subValue) : subValue}</span>
                        </li>  
                    ))}
                    </ul>
                    )
                    : 
                    ( index === 0 ? "" : value )} 
                </span>
            </div>
        ))}
        </li>
    )

}

export default JSONListItem;
```



# Uitleg over het gebruik van `{}` in JSX

## 1. `{Object.entries(item).map(([key, value], index) => ( ... ))}`

- `{}` zit **in andere `{}`** → ja, namelijk binnen JSX.
- **Nodig omdat**: `Object.entries(item).map(...)` is een JavaScript-uitdrukking die een lijst van elementen retourneert. In JSX moet je JavaScript-expressies tussen `{}` zetten.
- **Samenvatting**: `map()` genereert JSX, daarom moet de hele `map()`-functie in `{}` staan.

---

## 2. `<span className={index === 0 ? "mainKeyListItem" : ""}>`

- `{}` zit **in andere `{}`** → nee, het zit direct in een JSX-attribuut (`className`).
- **Nodig omdat**: JSX verwacht een string als waarde voor `className`. De expressie binnen `{}` evalueert tot een string.
- **Samenvatting**: Omdat je een JavaScript-uitdrukking gebruikt (`index === 0 ? "mainKeyListItem" : ""`), moet deze binnen `{}` staan.

---

## 3. `{index === 0 ? `${key} [${value}]` : `${key} :` }`

- `{}` zit **in andere `{}`** → ja, binnen JSX in een `<span>`.
- **Nodig omdat**: De waarde is een JavaScript-uitdrukking (`index === 0 ? ...`), dus moet binnen `{}`.
- **Samenvatting**: JSX accepteert alleen platte tekst zonder `{}`, dus JavaScript-uitdrukkingen moeten in `{}`.

---

## 4. `{typeof value === "object" ? ( <ul className="innerUl">...</ul> ) : ( index === 0 ? "" : value )}`

- `{}` zit **in andere `{}`** → ja, binnen JSX.
- **Nodig omdat**: De ternary-expressie (`? :`) is JavaScript en JSX moet expliciet weten dat dit dynamische content is.
- **Samenvatting**: Dit is een waarde die JSX moet verwerken, dus het moet in `{}`.

---

## 5. `{Object.entries(value).map(([subKey, subValue], subIndex) => ( ... ))}`

- `{}` zit **in andere `{}`** → ja, binnen JSX.
- **Nodig omdat**: `map()` is een JavaScript-expressie die JSX genereert.
- **Samenvatting**: Net zoals bij punt 1 moet `map()` in `{}` omdat het JSX retourneert.

---

## 6. `<li key={subKey} className={subIndex % 2 === 0 ? "evenInnerUl" : "oddInnerUl"}>`

- `{}` zit **in andere `{}`** → ja, binnen een JSX-attribuut.
- **Nodig omdat**: `subIndex % 2 === 0 ? "evenInnerUl" : "oddInnerUl"` is een JavaScript-uitdrukking die een string retourneert.
- **Samenvatting**: Net zoals bij `className` eerder, moet je JavaScript-uitdrukkingen binnen `{}` zetten.

---

## 7. `{typeof subValue === "object" ? JSON.stringify(subValue) : subValue}`

- `{}` zit **in andere `{}`** → ja, binnen JSX.
- **Nodig omdat**: `typeof subValue === "object" ? ...` is een JavaScript-expressie en JSX vereist `{}` voor JavaScript-expressies.
- **Samenvatting**: JSX accepteert geen ruwe JavaScript-expressies buiten `{}`, daarom moet dit in `{}`.

---

## TL;DR - Algemene regels

1. **Binnen JSX heb je `{}` nodig voor JavaScript-expressies**  
   ✅ **Voorbeeld**: `<span>{key}</span>`  

2. **Binnen attributen zoals `className`, `key`, etc. gebruik je `{}`**  
   ✅ **Voorbeeld**: `<div className={index === 0 ? "highlight" : ""}></div>`  

3. **Je hebt GEEN extra `{}` nodig binnen een ternary (`? :`) als het al in `{}` zit**  
   ❌ **Fout**: `{index === 0 ? {""} : {value}}`  
   ✅ **Correct**: `{index === 0 ? "" : value}`  

Hopelijk maakt dit alles duidelijk! 🚀🔥

