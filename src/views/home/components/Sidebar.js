export const Sidebar = ()=> {

    return (
        <div className="sidebar">
            <h2> <i className="far fa-user-circle"></i> Hi Assurance</h2>

            <a className="active" href="#home">
                <i className="fas fa-columns"></i> Dashboard
            </a>
            <a href="#contracts">
                <i className="fas fa-address-book"></i> Contracts
            </a>
            <a href="#transactions">
                <i className="fas fa-funnel-dollar"></i> Transactions
            </a>
            <a href="#invoices">
                <i className="fas fa-receipt"></i> Invoices
            </a>
            <a href="#cards">
                <i className="fas fa-receipt"></i> Cards
            </a>
            <a href="#settings">
                <i className="fas fa-cog"></i> Settings
            </a>
            <a href="#logout">
                <i className="fas fa-power-off"></i> Logout
            </a>
        </div>
    )
}