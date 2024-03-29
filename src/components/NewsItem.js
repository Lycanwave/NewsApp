import React, { Component } from "react";

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img className="card-img-top" src={imageUrl} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}... </h5>
                        <p className="card-text">{description}... </p>
                        <a
                            href={newsUrl}
                            target="blank"
                            className="btn btn-sm btn-dark"
                        >
                            Go somewhere
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
