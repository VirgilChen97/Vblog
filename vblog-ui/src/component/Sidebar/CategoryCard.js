import React, { useEffect } from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { useRequest } from '../Common/Hooks';
import { Link } from 'react-router-dom';

const CategoryCard = ({ owner }) => {
  const { t } = useTranslation()
  const [send, categories] = useRequest()

  useEffect(() => {
    const fetchAllUserCategory = async () => {
      send(null, `/categories?userId=${owner.id}`, "GET", null,)
    }
    fetchAllUserCategory()
  }, [owner, send])

  if (categories === null) {
    return null
  } else {
    return (
      <Card className="card-base">
        <div className="card-title">
          <Typography variant="caption">{t('categoryCard.categories')}</Typography>
        </div>
        <div className="card-content">
          {categories.length !== 0 ?
            <Grid container spacing={1}>
              {categories.map(category => (
                <Grid item container key={category.id} xs={12} justify="space-between">
                  <Grid item>
                    <Link to={`/page/${owner.username}/articles?category=${category.id}`}>{category.categoryName}</Link>
                  </Grid>
                  <Grid item>
                    {category.count}
                  </Grid>
                </Grid>
              ))}
            </Grid> : <Typography align="center">{t('categoryCard.noCategories')}</Typography>}
        </div>
      </Card>
    )
  }
}

export default CategoryCard