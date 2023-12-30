import "./App.scss";

export default function Tags(props) {
    return (
    <div className="tags">
        <ul className="tag-list"> 
          {props.tags ? props.tags.map((tag) => {
            return (
              <li>
                <div className="tag">
                  <p>{tag}</p>

                </div>
              </li>
            )
          })
           
          :
          <div/>}
        </ul>
    </div>
    )
}