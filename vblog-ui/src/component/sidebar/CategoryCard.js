import React, { useEffect } from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from 'react-i18next';
import { Divider, Grid } from '@material-ui/core';
import { useRequest } from '../common/Hooks';

const CategoryCard = ({ owner }) => {
  const { t } = useTranslation()
  const [send, jsonResponse, loading, success, error] = useRequest()

  useEffect(() => {
    const fetchAllUserCategory = async () => {
      send(null, `/categories?userId=${owner.id}`, "GET", null,)
    }
    fetchAllUserCategory()
  }, [owner])

  if (jsonResponse === null) {
    return null
  } else {
    let categories = jsonResponse.data
    return (
      <Card className="card-base">
        <div className="card-title">
          <Typography variant="caption">{t('categoryCard.categories')}</Typography>
        </div>
        <div className="card-content">
          <Grid container spacing={1}>
            {categories.length !== 0 ? categories.map(category => (
              <Grid item container key={category.id} xs={12} justify="space-between">
                <Grid item>
                  {category.categoryName}
                </Grid>
                <Grid item>
                  {category.count}
                </Grid>
              </Grid>
            )) : <Typography align="center">{t('categoryCard.noCategories')}</Typography>}
          </Grid>
        </div>
      </Card>
    )
  }
}

export default CategoryCard