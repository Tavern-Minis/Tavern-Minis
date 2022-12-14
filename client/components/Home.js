import React from "react";
import { connect } from "react-redux";
import { SingleProductInList } from "./SingleProductInList";
import { FilterBar } from "./FilterBar";
import { fetchProducts } from "../store/multipleProducts";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "all",

      sortByParam: "Rating (high to low)",
      sortedProducts: [],
      priceFilter: ['0,499','500,999','1000,1499','1500,2499','2500,4999','5000,100000000'],
      companyFilter: ["Games Workshop", "Reaper Minis", "Wizards of the Coast", "Hero Forge", "Dwarven Forge", "Miniature Market"],
      searchFilter: ''
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handleSortByParam = (sortByParam) => {
    this.setState({sortByParam: sortByParam})
  }

  handleFilterPrice = (priceFilter) => {
    this.setState({priceFilter: priceFilter});
  }

  handleFilterCompany = (companyFilter) => {
    this.setState({companyFilter: companyFilter})

  }

  handleSearchbar = (searchFilter) => {
    this.setState({searchFilter: searchFilter})
  }

  render() {
    const { products } = this.props;
    let { filter, sortByParam, sortedProducts, priceFilter, companyFilter, searchFilter } = this.state;
    sortedProducts = products.filter(
      (product) => product.category === filter || filter === "all"
    );
    sortedProducts = sortBy(sortByParam, sortedProducts);
    sortedProducts = filterPrice(priceFilter, sortedProducts);
    sortedProducts = filterCompany(companyFilter, sortedProducts);
    sortedProducts = filterSearchbar(searchFilter, sortedProducts);
    const topItems = sortedProducts.slice(0, 4);
    const otherItems = sortedProducts.slice(5);

    return (
        <div className="row">
          <FilterBar selectSortByParam={this.handleSortByParam} handleFilterPrice={this.handleFilterPrice} handleFilterCompany={this.handleFilterCompany}/>
          <div className="products-array">
                  <div>
                
        <div className="row">
          <div className="spacer" />
          <div className="search-bar">
          <input className="search-bar" type="text" onChange={(evt)=>{this.handleSearchbar(evt.target.value)}} placeholder="Search.." />
        </div>
        <div className="spacer" />
          <div className="row">
            <Link
              onClick={() => this.setState({ filter: "all" })}
            >
              All
            </Link>
            <Link
              onClick={() => this.setState({ filter: "characterMinis" })}
            >
              Character Minis
            </Link>
            <Link
              onClick={() => this.setState({ filter: "creatureMinis" })}
            >
              Creature Minis
            </Link>
            <Link
              onClick={() => this.setState({ filter: "accessories" })}
            >
              Accessories
            </Link>
            <Link
              onClick={() => this.setState({ filter: "dice" })}
            >
              Dice
            </Link>
            <Link
              onClick={() => this.setState({ filter: "artSupplies" })}
            >
              Art Supplies
            </Link>
          </div>{" "}
          <div className="spacer" />
        </div>
            <div className="top-row">
              {topItems.map((product) => {
                return (
                  <SingleProductInList product={product} key={product.id} />
                );
              })}
            </div>
            <div className="all-product-page">
              {otherItems.map((product) => {
                return (
                  <SingleProductInList product={product} key={product.id} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const sortBy = (param, arr) => {
  switch (param) {
    case "Price (low to high)":
      return arr.sort((a, b) => a.price - b.price);
    case "Price (high to low)":
      return arr.sort((a, b) => b.price - a.price);
    case "Rating (low to high)":
      return arr.sort((a, b) => a.rating - b.rating);
    case "Rating (high to low)":
      return arr.sort((a, b) => b.rating - a.rating);
    default:
      return arr.sort((a, b) => a.rating - b.rating);
  }
};

const filterPrice = (priceFilter, arr) => {
  return arr.filter(
    (product) => (
      (product.price < 500 && priceFilter.includes('0,499') ||
       product.price > 499 && product.price < 1000 && priceFilter.includes('500,999') ||
       product.price > 999 &&product.price < 1500 && priceFilter.includes('1000,1499') ||
       product.price > 1499 &&product.price < 2500 && priceFilter.includes('1500,2499') ||
       product.price > 2499 &&product.price < 5000 && priceFilter.includes('2500,4999') ||
       product.price > 4999 && priceFilter.includes('5000,100000000')
      )
    ))
}

const filterCompany = (companyFilter, arr) => {
  return arr.filter(
    (product) => (
      
        product.company === "Games Workshop" && companyFilter.includes("Games Workshop") ||
        product.company === "Reaper Minis" && companyFilter.includes("Reaper Minis") ||
        product.company === "Wizards of the Coast" && companyFilter.includes("Wizards of the Coast") ||
        product.company === "Hero Forge" && companyFilter.includes("Hero Forge") ||
        product.company === "Dwarven Forge" && companyFilter.includes("Dwarven Forge") ||
        product.company === "Miniature Market" && companyFilter.includes("Miniature Market")
      
    ))
}

const filterSearchbar = (search, arr) => {
  return arr.filter(
    (product) => (
        product.name.toLowerCase().includes(search.toLowerCase())
      
    )
  )
}

const mapState = (state) => {
  return {
    products: state.multipleProducts,
  };
};

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(Home);
