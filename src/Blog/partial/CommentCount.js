import axios from 'axios';
import React, {Component} from 'react';


class CommentCount extends Component {
    constructor(props) {
        super(props);

        const axiosGithub = axios.create({
            baseURL: 'https://api.github.com',
            headers: {
                'Accept': 'application/json'
            }
        });

        this.state = {
            loaded: false,
            axiosGithub: axiosGithub
        };


    }

    async componentDidMount() {
        this.state.axiosGithub.get(`/repos/${this.props.owner}/${this.props.repo}/issues`, {
                auth: {
                    username: this.props.clientId,
                    password: this.props.clientSecret
                },
                params: {
                    labels: "Gitalk"
                }
            }
        ).then(res => {
            res.data.map((issue) => {
                if (issue.title === this.props.title) {
                    this.state.axiosGithub.get(`/repos/${this.props.owner}/${this.props.repo}/issues/${issue.number}`).then((res) => {
                        this.setState({
                            loaded: true,
                            count: res.data.comments
                        });
                        return res;
                    });
                    return issue;
                }
                return issue;
            });
            return res;
        });
    }

    render() {
        if (this.state.loaded) {
            const count = this.state.count;
            let text;
            if (count !== 0) {
                if (count > 1) {
                    text = count + " Commentaires";
                } else {
                    text = "Un Commentaire";
                }
            } else {
                text = "Aucun Commentaire"
            }
            return (
                <div className="comment-count">{text}</div>
            );
        } else {
            return (
                <div className="comment-count">Chargement...</div>
            );
        }
    }
}

export default CommentCount;