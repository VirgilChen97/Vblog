import React, { useEffect } from 'react';
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { useTranslation } from 'react-i18next';
import { useRequest } from '../Common/Hooks';
import './sidebar.css';
import { Link } from 'react-router-dom';

const TagCard = ({ owner }) => {
	const { t } = useTranslation()
	const [send, tags] = useRequest()

	useEffect(() => {
		const fetchAllUserTags = async () => {
			send(null, `/tags?userId=${owner.id}`, "GET", null)
		}
		fetchAllUserTags()
	}, [owner, send])

	if (tags === null) {
		return null
	} else {
		return (
			<Card className="card-base">
				<div className="card-title">
					<Typography variant="caption">{t('tagCard.tags')}</Typography>
				</div>
				<div className="card-content">
				{tags.length !== 0 ? tags.map(tag => (
					<div className="badge" key={tag.id}>
						<Chip
              className="badge"
              clickable
							avatar={<Avatar>{tag.count}</Avatar>}
							label={tag.tagName}
              size="small"
              component={Link}
              to={`/page/${owner.username}/articles?tag=${tag.id}`}
						/>
					</div>
				)) :
					<Typography align="center">{t('tagCard.noTags')}</Typography>}
				</div>
			</Card>
		)
	}
}

export default TagCard