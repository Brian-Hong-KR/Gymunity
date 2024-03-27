"""empty message

Revision ID: dbdbb2b3c9fb
Revises: 
Create Date: 2024-03-22 11:47:36.169504

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dbdbb2b3c9fb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pt',
    sa.Column('pt_code', sa.Integer(), nullable=False),
    sa.Column('user_code', sa.Integer(), nullable=False),
    sa.Column('goal', sa.String(length=50), nullable=False),
    sa.Column('level', sa.String(length=50), nullable=False),
    sa.Column('abnormal', sa.String(length=150), nullable=False),
    sa.Column('plan_name', sa.String(length=100), nullable=False),
    sa.Column('plan_desc', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('pt_code')
    )
    op.create_table('pt_qna',
    sa.Column('qna_code', sa.Integer(), nullable=False),
    sa.Column('unit_name', sa.String(length=50), nullable=False),
    sa.Column('question', sa.Text(), nullable=False),
    sa.Column('anwer', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('qna_code')
    )
    op.create_table('pt_log',
    sa.Column('pt_log_code', sa.Integer(), nullable=False),
    sa.Column('pt_code', sa.Integer(), nullable=True),
    sa.Column('daily_program', sa.Text(), nullable=False),
    sa.Column('done_datetime', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['pt_code'], ['pt.pt_code'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('pt_log_code')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pt_log')
    op.drop_table('pt_qna')
    op.drop_table('pt')
    # ### end Alembic commands ###
