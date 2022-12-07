
<!-- <p align="center">
<img src='https://user-images.githubusercontent.com/31244930/203983970-81c94aca-5a53-4372-b627-e0e476fd32c1.png' />
</p> -->
<p align="center">
Fully customizable and responsive, ready-to-use SearchBox component like Youtube.
<br>
<br>
<a target="_blank" href="https://alptugidin.github.io/react-searchbox-like-google/">Demo</a>
<br>
<br>
</p>
<!-- <p align="center">
<a href="https://badge.fury.io/js/react-searchbox-like-google"> 
<img src="https://badge.fury.io/js/react-searchbox-like-google.svg" />
<img alt="npm" src="https://img.shields.io/npm/dm/react-searchbox-like-google">
</a>
</p> -->
<p align="center">
<img width="400" src="https://user-images.githubusercontent.com/31244930/206236669-77df3fc2-32f5-4efd-b2f1-9465aa1a0d54.gif"/>
<br>
<img width="400" src="https://user-images.githubusercontent.com/31244930/206236684-26f296c0-98dc-4e09-83df-efc7142e14a3.gif"/>
</p>




# Installation
```bash
npm install react-searchbox-like-youtube
```
or
```bash
yarn add react-searchbox-like-youtube
```

  
## Import

```javascript
import SearchBox from 'react-searchbox-like-youtube'
```

You can also import types if you needed.
```javascript
import SearchBox, { ISearchResult } from 'react-searchbox-like-youtube'
```
## Usage


### With required props.
```javascript
        <SearchBox
            onChange={handleOnChange}
            onClick={handleOnClick}
            onSearch={handleOnSearch}
            results={results}
        />
```

### With all props.

```jsx
        <SearchBox
            onChange={handleOnChange}
            onClick={handleOnClick}
            onSearch={handleOnSearch}
            nightMode={nightMode}
            results={results}
            placeholder='Search tutorials e.g. Javascript'
            sx={{
              lightBg: '#FFFFFF',
              darkBg: '#0F0F0F'
            }}
        />
```
### Handlers

```jsx
  //All parameters are optional.

const handleOnChange = (onChangeData: string): void => {
    //...
};

const handleOnClick = (onClickData: ISearchResult): void => {
    //...
};

const handleOnSearch = (onSearchData: any): void => {
    //...
};

```


  
## Props

| Prop      | Type      | Description                |
| :-------- | :------- | :------------------------- |
|`onChange` |<code>(onChangeData:&nbsp;string)&nbsp;=>&nbsp;void</code>  | A function that triggers when you typing. Callback function parameter provides the input value.|
|`onClick`|<code>(onClickData:&nbsp;IOnClickData)&nbsp;=>&nbsp;void</code>| A function that triggers when you select any of results. Callback function parameter provides selected result's data. |
|`onSearch`|<code>(onSearchData:&nbsp;any)&nbsp;=>&nbsp;void</code>| A function that triggers when you click search button or press 'enter'. Callback function parameter provides selected results data. |
|`results` | `ISearchResult[]` | Array of objects. [More details.](#results)|
|`placeHolder`|`string`| Placeholder |
|`sx`|`object`| Contains style properties. [More details.](#styling) |

## Results

Every single object in result array should have the following structure. id and title are required.

```javascript
interface ISearchResult {
  id: number
  title: string
  href?: string
}
```
## Stylings
```javascript
sx?: {
    lightBg?: string,   // default  #FFFFFF
    darkBg?: string     // default  #0F0F0F
  }
```
## Licence

[MIT](https://choosealicense.com/licenses/mit/) Alptuğ İdin

  
