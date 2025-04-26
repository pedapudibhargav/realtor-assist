const express = require('express');
const { supabase, validateTokenFromReq } = require('../utils/supabaseClient');
const router = express.Router();


// create brokarage in the database
router.post('/', async (req, res) => {
    console.log('---- Creating brokerage:');
    const { brokerName } = req.body;
    console.log('brokerName:', brokerName);
    if (!brokerName) {
        return res.status(400).json({ error: 'Broker name is required' });
    }
    try {
        // validate the user based on authtoken passed from header
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: 'Missing autherization token' });
        }
        const { data: user, error: userError } = await supabase.auth.getUser(authToken);
        if (userError) {
            console.error('Error fetching user:', userError);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = user.user.id;

        // create a brokerage
        const { data: brokerage, error: inserError } = await supabase.from('brokerage')
            .insert({ name: brokerName }).select();
        if (inserError) {
            console.error('Error inserting into brokerage table:', inserError);
            if (inserError.code === '23505') {
                return res.status(409).json({ error: 'Ooops looks like brokerage with same name exists. Try a different name.' });
            }
            return res.status(500).json({ inserError: 'Internal server error' });
        } else
            console.log('Brokerage created:', brokerage, 'id:', brokerage[0].id);

        // await on a promise for 500ms
        await new Promise(resolve => setTimeout(resolve, 500));

        // create brokerage_user_role relation in brokerage_user_roles pass user_id, borkerage_id = brokerage[0].id
        const { data: brokerageUserRole, error: brokerageUserRoleError } = await supabase.from('brokerage_user_roles')
            .insert({ user_id: userId, brokerage_id: brokerage[0].id, roles: 'admin' }).select();
        if (brokerageUserRoleError) {
            console.error('Error inserting into connection brokerage to the user:', brokerageUserRoleError);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(201).json({ message: 'Brokerage created successfully', brokerage_user: brokerageUserRole, brokerage: brokerage[0] });
    } catch (error) {
        console.error('Error creating brokarage:', error);
        res.status(500).json({ error: 'Internal server error', deatils: error });
    }
});

router.get('/', async (req, res) => {
    const user = await validateTokenFromReq(req);
    // console.log('user from get:', user);
    const userId = user.user.id;
    console.log('userId:', userId);
    try {
        const brokerRolesData = await supabase
            .from('brokerage_user_roles')
            .select('roles, user_id, brokerage_id')
            .eq('user_id', userId);
        console.log('brokerRolesData:', brokerRolesData);

        const { data: brokeragesWithRoles, error } = await supabase
            .from('brokerage_user_roles')
            .select('roles, brokerage(id, name)')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching brokerages with roles:', error);
            return res.status(500).json({ error: 'Internal server error', details: error });
        }

        if (!brokeragesWithRoles || brokeragesWithRoles.length === 0) {
            return res.status(404).json({ message: 'No brokerages found for the user' });
        }

        // The 'data' now contains the joined result, structured as an array of brokerage_user_roles,
        // with the corresponding brokerage data nested under the 'brokerage' key.
        res.status(200).json(brokeragesWithRoles);
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal server error', details: error });
    }
});

// get all the brokerages for the user
// router.get('/', async (req, res) => {
//     console.log('---- Getting all brokerages for the user:');
//     try {
//         // validate the user based on authtoken passed from header
//         const authToken = req.headers.authorization;
//         if (!authToken) {
//             return res.status(401).json({ error: 'Missing autherization token' });
//         }
//         const { data: user, error: userError } = await supabase.auth.getUser(authToken);
//         if (userError) {
//             console.error('Error fetching user:', userError);
//             return res.status(401).json({ error: 'Unauthorized' });
//         }
//         if (!user) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }

//         const userId = user.user.id;

//         // get all the brokerages for the user
//         const { data: brokerages_for_user, error: brokerageError } = await supabase.from('brokerage_user_roles')
//             .select('*, brokerage(*)')
//             .eq('user_id', userId);
//         if (brokerageError) {
//             console.error('Error fetching brokerages:', brokerageError);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         if (!brokerages_roles || brokerages_roles.length === 0) {
//             return res.status(404).json({ message: 'No brokerages found for the user' });
//         }
//         // Get all the brokerages from brokerage table with all brokerage_id from brokerages_roles then return the data
//         const brokerageIds = brokerages_for_user.map(brokerage => brokerage.brokerage_id);
//         const { data: brokerages, error: brokerageDataError } = await supabase.from('brokerage')
//             .select('*')
//             .in('id', brokerageIds);
//         if (brokerageDataError) {
//             console.error('Error fetching brokerages:', brokerageDataError);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         if (!brokerages || brokerages.length === 0) {
//             return res.status(404).json({ message: 'No brokerages found for the user' });
//         }

//         // mix roles from brokerages_roles with the brokerages data
//         const brokeragesWithRoles = brokerages.map(brokerage => {
//             const brokerageRole = brokerages_for_user.find(brokerage_role => brokerage_role.brokerage_id === brokerage.id);
//             return {
//                 ...brokerage,
//                 roles: brokerageRole ? brokerageRole.roles : null
//             };
//         });
//         return res.status(200).json(brokeragesWithRoles);
//     } catch (error) {
//         console.error('Error getting all brokerages:', error);
//         res.status(500).json({ error: 'Internal server error', deatils: error });
//     }
// });

module.exports = router;
