import models from '../../models';

export function validateUserValues(req, res, next){
	let values = req.body;
	if(values.email && values.password && values.UserRoleId){
		models.User.findOne({
			where: {
				email: values.email
			}
		})
			.then(user => {
				if(user){
					res.status(422).json({
						error: 'Email already in use.'
					});
				}
				else if (values.password.length < 6){
					res.status(422).json({
						error: 'Password has to be 6 characters or longer.'
					});
				}
				else{
					next();
				}
			})
			.catch(err => res.status(500).json({
				error: err.message
			}));
	}
	else {
		res.status(422).json({
			error: 'Email, password and role ID are required.'
		});
	}
}