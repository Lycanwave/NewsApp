import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropType from "prop-types";
export default class News extends Component {
    static defaultProps = { country: "in", page: 8, category: "general" };
    static propTypes = {
        country: PropType.string,
        pageSize: PropType.number,
        category: PropType.string,
    };
    constructor() {
        super();
        console.log("Constructor called");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalPage: 0,
        };
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=350686e00bde4af5a31855900a689746&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        //console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalPage: parsedData.totalResults,
        });
    }

    handleNextClick = async () => {
        console.log(this.totalPage);
        let url = `https://newsapi.org/v2/top-headlines?country=${
            this.props.country
        }&category=${
            this.props.category
        }&apiKey=350686e00bde4af5a31855900a689746&page=${
            this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        //console.log(parsedData);

        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
        });
    };

    handlePrevClick = async () => {
        console.log("Nextclick");
        let url = `https://newsapi.org/v2/top-headlines?country=${
            this.props.country
        }&category=${
            this.props.category
        }&apiKey=350686e00bde4af5a31855900a689746&page=${
            this.state.page - 1
        }&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        //console.log(parsedData);

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
        });
    };
    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">News app - Top headlines.</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={
                                        element.title
                                            ? element.title.slice(0, 45)
                                            : ""
                                    }
                                    description={
                                        element.description
                                            ? element.description.slice(0, 88)
                                            : ""
                                    }
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                ></NewsItem>
                            </div>
                        );
                    })}
                    <div className="container d-flex justify-content-between">
                        <button
                            disabled={this.state.page <= 1}
                            type="button"
                            className="btn btn-dark"
                            onClick={this.handlePrevClick}
                        >
                            &larr; Previous
                        </button>
                        <button
                            disabled={
                                this.state.page * this.props.pageSize >=
                                this.state.totalPage
                            }
                            type="button"
                            className="btn btn-dark"
                            onClick={this.handleNextClick}
                        >
                            Next &rarr;
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
